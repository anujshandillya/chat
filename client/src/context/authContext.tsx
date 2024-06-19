import { createContext, useContext, useState } from "react";

interface AuthContextType {
  authUser: any;
  setAuthUser: React.Dispatch<any>;
}

export const authContext = createContext<AuthContextType | any>(null);

export const useAuthContext = () => {
  return useContext(authContext);
};

export const AuthContextProvider = ({ children }: any) => {
  const [authUser, setAuthUser] = useState<any>(
    JSON.parse(localStorage.getItem("authUser"))
  );

  return (
    <authContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </authContext.Provider>
  );
};
