import { motion } from "framer-motion";
import { LoaderCircle } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-red-100 to-red-200 flex flex-col items-center justify-center space-y-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <LoaderCircle className="w-16 h-16 text-red-600" />
      </motion.div>
      <p className="text-lg font-semibold text-red-700">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
