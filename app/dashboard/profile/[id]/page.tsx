import Profile from "@/components/Dashboard/ProfileUsers/Profile";

function page({ params }) {
  const { id } = params;
  return (
    <>
      <Profile id={id} />
    </>
  );
}

export default page;
