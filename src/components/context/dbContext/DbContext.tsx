import { createContext } from "react";
import { db } from "../../firebase";

type childrenProps = {
  children: React.ReactNode;
};

export const DbContext = createContext(db);

export const DbContextProvider = ({ children }: childrenProps) => {

  return (
    <DbContext.Provider value={db}>
      {children}
    </DbContext.Provider>
  );
};
