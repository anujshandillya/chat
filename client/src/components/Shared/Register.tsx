import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";

const Register = () => {
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const {loading,signUp} = useSignup();
  const handleCheckboxChange = (gender: string) => {
    setInputs({ ...inputs, gender });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signUp(inputs);
    // console.log(inputs);
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
        <div className="p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
          <h1 className="text-3xl font-semibold text-center text-grey-300">
            Register
            <span className="text-black"> Chat App</span>
          </h1>
          <form onSubmit={handleSubmit}>
            <div>
              {/* fname */}
              <label className="label p-2">
                <span className="text-base label-text">First Name</span>
              </label>
              <input
                type="text"
                className="w-full input input-bordered h-10"
                placeholder="Enter First Name"
                value={inputs.firstName}
                onChange={(e) =>
                  setInputs({ ...inputs, firstName: e.target.value })
                }
              />
            </div>
            {/* lname */}
            <div>
              <label className="label p-2">
                <span className="text-base label-text">Last Name</span>
              </label>
              <input
                type="text"
                className="w-full input input-bordered h-10"
                placeholder="Enter Last Name"
                value={inputs.lastName}
                onChange={(e) =>
                  setInputs({ ...inputs, lastName: e.target.value })
                }
              />
            </div>
            {/* email */}
            <div>
              <label className="label p-2">
                <span className="text-base label-text">Email</span>
              </label>
              <input
                type="text"
                className="w-full input input-bordered h-10"
                placeholder="Enter Email"
                value={inputs.email}
                onChange={(e) =>
                  setInputs({ ...inputs, email: e.target.value })
                }
              />
            </div>

            {/* username */}
            <div>
              <label className="label p-2">
                <span className="text-base label-text">Username</span>
              </label>
              <input
                type="text"
                className="w-full input input-bordered h-10"
                placeholder="Enter username"
                value={inputs.username}
                onChange={(e) =>
                  setInputs({ ...inputs, username: e.target.value })
                }
              />
            </div>
            {/* password */}
            <div>
              <label className="label p-2">
                <span className="text-base label-text">Password</span>
              </label>
              <input
                type="password"
                className="w-full input input-bordered h-10"
                placeholder="Enter password"
                value={inputs.password}
                onChange={(e) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
              />
              <input
                type="password"
                className="w-full input input-bordered h-10"
                placeholder="Confirm password"
                value={inputs.confirmPassword}
                onChange={(e) =>
                  setInputs({ ...inputs, confirmPassword: e.target.value })
                }
              />
            </div>
            <GenderCheckbox
              onCheckboxChange={handleCheckboxChange}
              selectedGender={inputs.gender}
            />
            <div>
              <Link
                to={"/login"}
                className="text-sm hover:underline hover:text-blue-500 mt-2 inline-block"
              >
                Already have an account? Login{" "}
              </Link>
            </div>
            {/* gender */}
            <div>
              <button className="btn btn-block btn-sm mt-2 border border-slate-700">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
