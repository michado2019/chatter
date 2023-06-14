
//Type for authenticated user
export type AuthUserType = {
    firstName: string;
    lastName: string;
    email: string;
  };
  export type UserProps = {
      user: AuthUserType | null,
      setUser: React.Dispatch<React.SetStateAction<AuthUserType | null>>
  }
  
  //Type for UserContextProps
  
  export type UserContextType = {
      children: React.ReactNode
  };