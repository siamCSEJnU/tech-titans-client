"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useAuthStore } from "../../../../../store/authStore";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Cookies from "js-cookie";

const SocialCallbackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setToken, getMe, intendedPath, setIntendedPath, setUser, setAvatar } =
    useAuthStore();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("access_token");
    const avatarUrl = params.get("avatar_url");
    const error = searchParams.get("error");
    const intended = searchParams.get("redirect") || intendedPath || "/";

    if (error) {
      toast.error(`Login failed: ${error}`);
      router.push("/login");
      return;
    }

    if (!token) {
      toast.error("Login failed. No access token provided.");
      router.replace("/login");
      return;
    } else {
      toast.success("Logged in successfully!", { autoClose: 1300 });
    }

    // Set the token in the store
    setToken(token);
    //set the token in the cookies also
    Cookies.set("auth-token", token);
    // Set temporary avatar while fetching full user data
    if (avatarUrl) {
      setAvatar(avatarUrl);
    }

    //Fetch user data
    getMe()
      .then(() => {
        router.push(intended); // Use intended path
      })
      .catch((err) => {
        toast.error("Failed to load user data");
        router.push("/login");
      });
  }, [searchParams, router, setToken, getMe, intendedPath, setIntendedPath]);

  return (
    <>
      <LoadingSpinner></LoadingSpinner>
    </>
  );
};

export default SocialCallbackPage;
