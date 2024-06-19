import React from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/authContext";

interface formFields {
    username: string;
    password: string;
  }

const useLogin = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const { setAuthUser } = useAuthContext();

  const login = async ({
    username,
    password,
}: formFields) => {
    const success = await handleInputErrors({
        username,
        password,
    });
    if(!success) return;

    setLoading(true);
    try {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });
        const data=await res.json();
        if(data.error){
            throw new Error(data.error);
        }
        localStorage.setItem("authUser", JSON.stringify(data));
        if(setAuthUser) setAuthUser(data);
    } catch (error: any) {
        toast.error(error);
    } finally {
        setLoading(false);
    }
};
  return {loading, login};
};

export default useLogin;

const handleInputErrors = async ({
    username,
    password,
  }: formFields) => {
    if (
      !username ||
      !password
    ) {
      toast.error("Please fill in all fields");
      return false;
    }
    return true;
  };
