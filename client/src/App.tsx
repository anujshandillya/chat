import "./App.css";
import Register from "./components/Shared/Register";
import Login from "./components/Shared/Login";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <div className="p-4 h-screen flex items-center justify-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
