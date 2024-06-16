import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
        <div className="p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
          <h1 className="text-3xl font-semibold text-center text-grey-300">
            Login
            <span className="text-black"> Chat App</span>
          </h1>
          <form>
            <div>
              <label className="label p-2">
                <span className="text-base label-text">Username</span>
              </label>
              <input
                type="text"
                className="w-full input input-bordered h-10"
                placeholder="Enter username"
              />
              </div>
              <div>
              <label className="label p-2">
                <span className="text-base label-text">Password</span>
              </label>
              <input
                type="password"
                className="w-full input input-bordered h-10"
                placeholder="Enter password"
              />
            </div>
            <div>
            <Link
                to={"/register"}
                className="text-sm hover:underline hover:text-blue-500 mt-2 inline-block"
              >
                Don't have an account? Sign Up
              </Link>
            </div>
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

export default Login;
