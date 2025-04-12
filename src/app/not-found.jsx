"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { HomeIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

const NotFoundPage404 = () => {
  const router = useRouter();

  return (
    <div className=" flex flex-col items-center justify-center bg-gray-50 p-4 text-center">
      <div className="max-w-md w-full space-y-6">
        {/* Error Code */}
        <div className="text-8xl font-bold text-gray-300">404</div>

        {/* Message */}
        <h1 className="text-3xl font-bold text-gray-800">Page Not Found</h1>
        <p className="text-lg text-gray-600">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => router.back()}
            className="flex items-center gap-2 cursor-pointer"
            variant="outline"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            Go Back
          </Button>

          <Link href="/" passHref>
            <Button className="flex items-center gap-2 cursor-pointer">
              <HomeIcon className="h-5 w-5" />
              Return Home
            </Button>
          </Link>
        </div>

        {/* Optional: Search or Help Links */}
        <div className="pt-8 text-sm text-gray-500">
          <p>
            Need help?{" "}
            <Link href="/contact" className="text-blue-600 hover:underline">
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage404;
