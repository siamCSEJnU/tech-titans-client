"use client";
import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useRouter } from "next/navigation";
import { useAuthStore } from "../../../store/authStore";
import { updateProfile } from "@/lib/apis/user-api";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { ImSpinner4 } from "react-icons/im";

const ProfileUpdateForm = () => {
  const router = useRouter();
  const { user, setUser, intendedPath } = useAuthStore();

  const [isUpdating, setIsUpdating] = useState(false);
  // Local state for form fields; pre-populate with current user data.
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [contact, setContact] = useState(user?.mobile_number || "");
  const [location, setLocation] = useState(user?.location || "");
  const [country, setCountry] = useState(user?.country || "");
  const [image, setImage] = useState(null);

  // Update local state whenever the user data changes.
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setContact(user.mobile_number || "");
      setLocation(user.location || "");
      setCountry(user.country || "");
    }
  }, [user]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    setIsUpdating(true);
    e.preventDefault();

    let profileData;
    if (image) {
      // If you want to support image upload via FormData:
      profileData = new FormData();
      profileData.append("name", name);
      profileData.append("email", email);
      profileData.append("mobile_number", contact);
      profileData.append("location", location);
      profileData.append("country", country);
      if (image) {
        profileData.append("image", image);
      }
    } else {
      // Otherwise, send JSON
      profileData = {
        name,
        email,
        mobile_number: contact,
        location,
        country,
      };
    }

    try {
      const res = await updateProfile(profileData);
      const updatedUser = res?.data?.user;

      toast.success("Profile updated successfully!", { autoClose: 1000 });
      // console.log(updatedUser);

      setIsUpdating(false);
      if (updatedUser) {
        setUser(updatedUser);
        router.push(intendedPath);
      } else {
        router.push("/user-dashboard");
      }
    } catch (error) {
      toast.error(error.message || "Profile update failed. Please try again.", {
        autoClose: 1500,
      });
      setIsUpdating(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto bg-gray-100">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">
          Update Profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Grid for Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name Field */}
            <div className="form-control space-y-1">
              <label className="block font-bold">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border p-2 rounded-md bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            {/* Email Field */}
            <div className="form-control space-y-1">
              <label className="block font-bold">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border p-2 rounded-md bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          {/* Grid for Contact and Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Contact Field */}
            <div className="form-control space-y-1">
              <label className="block font-bold">Contact Number</label>
              <input
                type="tel"
                placeholder="Enter your mobile number"
                className="w-full border p-2 rounded-md bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
            {/* Location Field */}
            <div className="form-control space-y-1">
              <label className="block font-bold">Location</label>
              <input
                type="text"
                placeholder="Enter your location"
                className="w-full border p-2 rounded-md bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
          {/* Single row for Country */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control space-y-1">
              <label className="block font-bold">Country</label>
              <input
                type="text"
                placeholder="Enter your country"
                className="w-full border p-2 rounded-md bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div className="form-control space-y-1">
              <label className="block font-bold" htmlFor="image">
                Profile Picture
              </label>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border p-2 rounded-md bg-white focus:ring-1 focus:ring-blue-500 outline-none cursor-pointer"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full text-white py-2 rounded hover:bg-gray-700 transition-colors cursor-pointer"
          >
            {isUpdating ? (
              <ImSpinner4 className="animate-spin m-0 text-gray-300  "></ImSpinner4>
            ) : (
              "Update Profile"
            )}
          </Button>

          <div className="place-items-center">
            <Button
              onClick={() => router.back()}
              className="flex items-center gap-2 cursor-pointer"
              variant="outline"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              Go Back
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileUpdateForm;
