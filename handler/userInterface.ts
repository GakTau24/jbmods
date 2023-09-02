export interface UserData {
  id: number;
  name: string;
  email: string;
  image: string;
}

export interface SessionData {
  user: UserData;
  expires: string;
}
export interface UserSession {
  id: string;
  name: string;
  email: string;
  image: string;
}

export interface IUser {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  password: string | null;
}
