"use client";
import axios from "axios";
import { useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  image: string;
}

function Profile({ id }) {
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedImage, setUpdatedImage] = useState("");
  const [updateError, setUpdateError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/api/users/${id}`);
        const { name, image } = response.data;
        setUserProfile(response.data);
        setUpdatedName(name);
        setUpdatedImage(image);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError("An error occurred while fetching user profile.");
      }
    };

    fetchProfile();
  }, [id]);

  const handleUpdateProfile = async () => {
    setUpdateError(null);

    try {
      await axios.put(`/api/users/${id}`, {
        name: updatedName,
        image: updatedImage,
      });

      const response = await axios.get(`/api/users/${id}`);
      setUserProfile(response.data);

      setEditing(false);
    } catch (error) {
      setUpdateError("An error occurred while updating user profile.");
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        {userProfile ? (
          <>
            <div className="bg-opacity-25 bg-gray-900 backdrop-blur-xl p-8 rounded-md w-full">
              <h1 className="flex justify-center py-5">
                Welcome, {userProfile.name}
              </h1>
              <h1 className="pb-5">Noted: if you update the picture or name then you have to re-login</h1>
              {editing ? (
                <div className="flex justify-center items-center flex-col gap-3">
                  <input
                    type="text"
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                    placeholder="Enter updated name"
                    className="shadow-xl p-4 rounded-xl bg-transparent border-violet-600 ring-1 focus:ring-violet-600 focus:outline-none"
                  />
                  <input
                    type="text"
                    value={updatedImage}
                    onChange={(e) => setUpdatedImage(e.target.value)}
                    placeholder="Enter updated image URL"
                    className="shadow-xl p-4 rounded-xl bg-transparent border-violet-600 ring-1 focus:ring-violet-600 focus:outline-none"
                  />
                  <button
                    onClick={handleUpdateProfile}
                    className="bg-blue-500 hover:bg-blue-600 p-3 rounded-md">
                    Update Profile
                  </button>
                  {updateError && <p>{updateError}</p>}
                </div>
              ) : (
                <div className="flex justify-center items-center">
                  <button
                    onClick={() => setEditing(true)}
                    className="bg-blue-500 hover:bg-blue-600 p-3 rounded-md">
                    Edit Profile
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <p>User profile not available.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
