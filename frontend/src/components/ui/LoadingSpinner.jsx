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

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 via-blue-200 to-blue-400 relative overflow-hidden">
      {/* Floating background glow effects */}
      <motion.div
        className="absolute w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-30"
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -40, 40, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-80 h-80 bg-blue-500 rounded-full blur-3xl opacity-20"
        animate={{
          x: [0, -60, 60, 0],
          y: [0, 60, -60, 0],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 🔥 Advanced animated spinner */}
      <div className="relative w-24 h-24 z-10 flex items-center justify-center">
        {/* Outer pulsating ring */}
        <motion.div
          className="absolute w-24 h-24 border-4 border-red-500 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.4, 1],
          }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Middle rotating ring */}
        <motion.div
          className="absolute w-16 h-16 border-t-4 border-red-500 border-dashed rounded-full"
          animate={{
            rotate: 360,
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        {/* Inner pulsing dot */}
        <motion.div
          className="w-4 h-4 bg-red-600 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0.7, 1],
          }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Main message */}
      <motion.p
        className="text-xl md:text-2xl font-bold text-red-700 mt-8 z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Loading, please wait...
      </motion.p>

      {/* Sub-message */}
      <motion.p
        className="text-sm md:text-base text-red-600 mt-2 text-center px-6 max-w-md leading-relaxed z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      >
        ⚙️ The backend server is hosted on <span className="font-semibold">Render</span>.  
        It might take a few seconds to wake up after being idle.  
        Thank you for your patience!
      </motion.p>

      {/* Animated connection message */}
      <motion.div
        className="mt-6 text-red-500 font-medium tracking-wider z-10"
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Connecting to server...
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;
