import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/authContext";

interface formFields {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  gender: string;
}

const useSignup = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const {setAuthUser} = useAuthContext() || {};

  const signUp = async ({
    firstName,
    lastName,
    email,
    username,
    password,
    confirmPassword,
    gender,
  }: formFields) => {
    const success = await handleInputErrors({
      firstName,
      lastName,
      email,
      username,
      password,
      confirmPassword,
      gender,
    });
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          username,
          password,
          confirmPassword,
          gender,
        }),
      });
      const data=await res.json();
      if(data.error){
        throw new Error(data.error);
      }
      // localstorage
      localStorage.setItem("authUser", JSON.stringify(data));
      if (setAuthUser) {
        setAuthUser(data);
      }
      // context
    } catch (error: any) {
      toast.error(error);
    } finally {
        setLoading(false);
    }
  };
  return { loading, signUp };
};

export default useSignup;

const handleInputErrors = async ({
  firstName,
  lastName,
  email,
  username,
  password,
  confirmPassword,
  gender,
}: formFields) => {
  if (
    !firstName ||
    !lastName ||
    !email ||
    !username ||
    !password ||
    !confirmPassword ||
    !gender
  ) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }
  return true;
};
