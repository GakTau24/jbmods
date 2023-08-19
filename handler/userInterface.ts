// userInterface.ts
export interface UserData {
    id: number;
    name: string;
    email: string;
  }
  
  export interface SessionData {
    user: UserData;
    expires: string;
  }
  