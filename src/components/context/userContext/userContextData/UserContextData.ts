
//Type for authenticated user
export type AuthUserType = {
    displayName?: string | null;
    email?: string | null;
    photoUrl?: string | null;
    emailVerified?: boolean | null
  };
  export type UserProps = {
      user: AuthUserType | null,
      setUser: React.Dispatch<React.SetStateAction<AuthUserType | null>>
  }
  
  //Type for UserContextProps
  
  export type UserContextType = {
      children: React.ReactNode
  };