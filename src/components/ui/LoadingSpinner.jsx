import React from "react";
import { PropagateLoader } from "react-spinners";
const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <PropagateLoader size={25} color="#4A5565" />
    </div>
  );
};

export default LoadingSpinner;
