"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImSpinner4 } from "react-icons/im";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";

import SocialLogin from "./components/SocialLogin";
import { useAuthStore } from "../../../../store/authStore";
import { useWishlistStore } from "../../../../store/wishlist-store";

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error, setIntendedPath, getMe, intendedPath } =
    useAuthStore();
  const { fetchWishlist } = useWishlistStore();

  useEffect(() => {
    if (!intendedPath.includes("/products")) {
      const intended = searchParams.get("redirect") || "/";
      setIntendedPath(intended);
    }
  }, [searchParams, setIntendedPath]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      await getMe();
      // const userData = useAuthStore.getState().user;
      // console.log(userData);

      toast.success("Login successful!", {
        autoClose: 1000,
      });
      fetchWishlist(email);
      router.push(useAuthStore.getState().intendedPath || "/"); // Use intended path
      setIntendedPath("/"); // Reset after use
    } catch (error) {
      toast.error(error.message || "Login failed");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card className="max-w-md mx-auto mt-4 bg-gray-100">
      <CardHeader>
        <CardTitle className="text-3xl font-bold leading-none tracking-tight text-foreground text-center">
          Login
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="form-control w-full space-y-1">
            <label className="label block w-full">
              <span className="label-text font-bold">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className=" w-full border p-2 rounded-md bg-white focus:ring-1 focus:ring-black outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-control w-full space-y-1">
            <label className="label w-full block">
              <span className="label-text font-bold">Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="Type password"
                onChange={(e) => setPassword(e.target.value)}
                className=" w-full border p-2 rounded-md bg-white focus:ring-1 focus:ring-black outline-none pr-10"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? (
              <ImSpinner4 className="animate-spin mx-auto" />
            ) : (
              "Login"
            )}
          </Button>
        </form>
        <div className="mt-2">
          <p className="text-center mb-3">Or Sign In with</p>
          <SocialLogin />
          <p className="text-center mt-2">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-blue-500 hover:text-blue-700"
            >
              Register
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
