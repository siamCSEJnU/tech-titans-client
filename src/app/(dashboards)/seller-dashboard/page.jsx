"use client";
import React, { useEffect, useState } from "react";
import SellerProductsList from "./components/SellerProductsList";

const SellerDashboard = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products Management</h1>
      <SellerProductsList />
    </div>
  );
};

export default SellerDashboard;
