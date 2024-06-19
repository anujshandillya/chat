import "./App.css";
import Register from "./components/Shared/Register";
import Login from "./components/Shared/Login";
import Home from "./components/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/authContext";

function App() {
  const {authUser, setAuthUser} = useAuthContext();
  return (
    <>
      <div className="p-4 h-screen flex items-center justify-center">
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/register"
            element={authUser ? <Navigate to={"/"} /> : <Register />}
          />
          <Route
            path="/login"
            element={authUser ? <Navigate to={"/"} /> : <Login />}
          />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
