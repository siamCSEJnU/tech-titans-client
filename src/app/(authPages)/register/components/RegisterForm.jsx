"use client";
import React, { useState } from "react";
import registerUser from "@/app/services/auth/registerUser";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImSpinner, ImSpinner3, ImSpinner4 } from "react-icons/im";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRegistrationSore } from "../../../../../store/registration-store";

const RegisterForm = () => {
  const router = useRouter();

  const {
    formData,
    errors,
    isSubmitting,
    showPassword,
    showConfirmPassword,
    setFormData,
    setErrors,
    setIsSubmitting,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
  } = useRegistrationSore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });

    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Email is invalid";

    if (!formData.contact.trim()) {
      newErrors.contact = "Contact number is required";
    } else if (/\D/.test(formData.contact)) {
      newErrors.contact = "Only digits (0-9) are allowed";
    } else if (!/^\d{11}$/.test(formData.contact)) {
      newErrors.contact = "Must be exactly 11 digits";
    }
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        mobile_number: formData.contact,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
      };

      const response = await registerUser(userData);
      // console.log(response);

      toast.success("Registration successful!", { autoClose: 1000 });
      useRegistrationSore.getState().resetForm(); // Reset form state after successful registration
      setFormData({}); // Reset form data
      router.push("/login"); // Redirect to login page after successful registration
    } catch (error) {
      if (error.response?.data?.errors) {
        // Handle Laravel validation errors
        const apiErrors = error.response.data.errors;
        const formattedErrors = {};

        Object.keys(apiErrors).forEach((key) => {
          formattedErrors[key] = apiErrors[key][0];
        });

        setErrors(formattedErrors);
      } else {
        toast.error(error.message || "Registration failed. Please try again.", {
          autoClose: 1500,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Card className="max-w-md mx-auto bg-gray-100">
      <CardHeader>
        <CardTitle className="text-3xl font-bold leading-none tracking-tight text-foreground text-center">
          Sign Up
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="w-full space-y-2" onSubmit={handleSubmit}>
          <div className="form-control w-full space-y-1">
            <label className="label block w-full">
              <span className="label-text font-bold">Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className={`w-full border p-2 rounded-md bg-white focus:ring-1 focus:ring-black outline-none ${
                errors.name ? "border-red-500" : ""
              }`}
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          <div className="form-control w-full space-y-1">
            <label className="label block w-full">
              <span className="label-text font-bold">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className={`w-full border p-2 rounded-md bg-white focus:ring-1 focus:ring-black outline-none ${
                errors.email ? "border-red-500" : ""
              }`}
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="form-control w-full space-y-1">
            <label className="label block w-full">
              <span className="label-text font-bold">Contact Number</span>
            </label>
            <input
              type="tel"
              name="contact"
              placeholder="Enter your mobile number"
              className={`w-full border p-2 rounded-md bg-white focus:ring-1 focus:ring-black outline-none ${
                errors.contact ? "border-red-500" : ""
              }`}
              value={formData.contact}
              onChange={handleChange}
            />
            {errors.contact && (
              <p className="text-red-500 text-sm">{errors.contact}</p>
            )}
          </div>

          <div className="form-control w-full space-y-1">
            <label className="label w-full block">
              <span className="label-text font-bold">Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Type password"
                className={`w-full border p-2 rounded-md bg-white focus:ring-1 focus:ring-black outline-none pr-10 ${
                  errors.password ? "border-red-500" : ""
                }`}
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <div className="form-control w-full space-y-1">
            <label className="label w-full block">
              <span className="label-text font-bold">Confirm Password</span>
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Re-type password"
                className={`w-full border p-2 rounded-md bg-white focus:ring-1 focus:ring-black outline-none pr-10 ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>

          <Button
            className="w-full cursor-pointer"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ImSpinner4 className="animate-spin m-0 text-gray-300  "></ImSpinner4>
            ) : (
              "Sign Up"
            )}
          </Button>

          <p className="text-center">
            Have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:text-blue-700 ">
              Login
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
