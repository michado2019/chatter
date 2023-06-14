import { createContext, useState } from "react";
import {
  AuthUserType,
  UserContextType,
  UserProps,
} from "./userContextData/UserContextData";
//UserContext creation
export const UserContext = createContext<UserProps | null>(null);

//UserContext provider
export const UserContextProvider = ({ children }: UserContextType) => {
  const [user, setUser] = useState<AuthUserType | null>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
