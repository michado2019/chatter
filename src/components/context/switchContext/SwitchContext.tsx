import { createContext, useState } from "react";

//Type for switch ChildrenProps
type ChildrenProps = {
  children: React.ReactNode;
};

//Type for switch ValueProps
type ValueProps = {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
};
export const SwitchContext = createContext<ValueProps | null>(null);

export const SwitchContextProvider = ({ children }: ChildrenProps) => {
  //Switch state
  const [state, setState] = useState(false);
  return (
    <SwitchContext.Provider value={{ state, setState }}>
      {children}
    </SwitchContext.Provider>
  );
};
