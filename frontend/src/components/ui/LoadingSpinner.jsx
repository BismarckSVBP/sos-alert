// import { motion } from "framer-motion";
// import { LoaderCircle } from "lucide-react";

// const LoadingSpinner = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white via-red-100 to-red-200 flex flex-col items-center justify-center space-y-4">
//       <motion.div
//         animate={{ rotate: 360 }}
//         transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//       >
//         <LoaderCircle className="w-16 h-16 text-red-600" />
//       </motion.div>
//       <p className="text-lg font-semibold text-red-700">Loading...</p>
//     </div>
//   );
// };

// export default LoadingSpinner;
import { motion } from "framer-motion";
import { LoaderCircle } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white via-rose-100 to-rose-300 relative overflow-hidden">
      {/* Animated floating background circles */}
      <motion.div
        className="absolute w-72 h-72 bg-rose-200 rounded-full blur-3xl opacity-30"
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -30, 30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-rose-300 rounded-full blur-3xl opacity-20"
        animate={{
          x: [0, -60, 60, 0],
          y: [0, 40, -40, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Spinner */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="z-10"
      >
        <LoaderCircle className="w-20 h-20 text-rose-600 drop-shadow-lg" />
      </motion.div>

      {/* Main Text */}
      <motion.p
        className="text-xl md:text-2xl font-semibold text-rose-700 mt-6 z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Loading, please wait...
      </motion.p>

      {/* Subtext */}
      <motion.p
        className="text-sm md:text-base text-rose-800 mt-2 text-center px-6 max-w-md leading-relaxed z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.6 }}
      >
        ⚙️ The backend server is hosted on <span className="font-bold">Render</span>.  
        It may take a few seconds to wake up after being idle.  
        Thanks for your patience!
      </motion.p>

      {/* Subtle pulse animation on the spinner text */}
      <motion.div
        className="mt-6 text-rose-500 font-medium tracking-wider"
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Connecting to server...
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;
