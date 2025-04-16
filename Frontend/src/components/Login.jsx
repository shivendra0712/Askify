import React from "react";
import { FcGoogle } from "react-icons/fc";




const Login = () => {
  const handleLogin = () => {
    // window.open("http://localhost:3000/auth/google", "_self");
    window.open("https://askify-backend-l0fk.onrender.com/auth/google", "_self");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4">
      <div className="bg-zinc-900 text-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Welcome Back 👋</h1>
        <p className="text-sm text-gray-400 mb-8 text-center">
          Login to your account using your Google credentials
        </p>

        <button
          onClick={handleLogin}
          className="w-full flex items-center justify-center gap-3 py-3 px-5 rounded-xl bg-white text-black font-semibold hover:scale-105 transition-transform duration-300 shadow-md"
        >
          <FcGoogle size={24} />
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
