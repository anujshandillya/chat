import React from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/authContext";

const useLogout = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const { setAuthUser } = useAuthContext();
  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.removeItem("authUser");
      setAuthUser(null);
    } catch (error: any) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;
