import React from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";

const SocialLogin = () => {
  const handleSocialLogin = async (provider) => {
    window.location.href = `http://localhost:8000/api/auth/redirect/${provider}`;
  };

  return (
    <div className="flex justify-center gap-8">
      <button
        onClick={() => handleSocialLogin("google")}
        className="bg-slate-200 rounded-full p-3 hover:bg-slate-300 text-orange-500 transition-colors cursor-pointer"
        aria-label="Login with Google"
      >
        <FaGoogle className="text-xl" />
      </button>
      <button
        onClick={() => handleSocialLogin("github")}
        className="bg-slate-200 rounded-full p-3 hover:bg-slate-300 transition-colors cursor-pointer"
        aria-label="Login with GitHub"
      >
        <FaGithub className="text-xl" />
      </button>
    </div>
  );
};

export default SocialLogin;
