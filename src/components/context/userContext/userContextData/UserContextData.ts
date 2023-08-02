
//Type for authenticated user
export type AuthUserType = {
    displayName?: string | null;
    email?: string | null;
    photoUrl?: string | null;
    photoURL?: string | null;
    emailVerified?: boolean | null;
    uid: string
  };
  export type UserProps = {
      user: AuthUserType | null,
      setUser: React.Dispatch<React.SetStateAction<AuthUserType | null>>
  }
  
  //Type for UserContextProps
  
  export type UserContextType = {
      children: React.ReactNode
  };