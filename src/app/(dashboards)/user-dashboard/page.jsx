"use client";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../../../store/authStore";
import { getPaymentHistory } from "@/lib/apis/payment-api";
import Link from "next/link";
import PaymentHistoryTable from "@/components/dashboard/PaymentHistoryTable";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/dashboard/Sidebar";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useRouter } from "next/navigation";

const UserDashboard = () => {
  const { user, intendedPath, setIntendedPath } = useAuthStore();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (intendedPath === "/checkout") {
      router.push("user-dashboard");
      setIntendedPath("/");
    }
    const fetchHistory = async () => {
      if (user?.email) {
        try {
          const history = await getPaymentHistory(user?.email);
          setPayments(history);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching payment history:", error.message);
        }
      }
    };

    fetchHistory();
  }, [user?.email]);
  // console.log(payments);

  return (
    <div className="flex-1 p-6">
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <LoadingSpinner></LoadingSpinner>
        </div>
      ) : payments.length > 0 ? (
        <PaymentHistoryTable payments={payments} />
      ) : (
        <p className="text-gray-500">No payment history found.</p>
      )}
      <div className="mt-4">
        <Link href="/products">
          <Button className="bg-gray-500 text-white cursor-pointer">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default UserDashboard;
