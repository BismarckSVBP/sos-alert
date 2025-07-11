import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = ({ icon: Icon, ...props }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative mb-6">
      {/* Left Icon */}
      {Icon && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Icon className="size-5 text-green-500" />
        </div>
      )}

      {/* Password Field */}
      <input
        {...props}
        type={show ? "text" : "password"}
        className="w-full pl-10 pr-10 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200"
      />

      {/* Show/Hide Toggle Icon */}
      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        className="absolute inset-y-0 right-0 flex items-center pr-3 text-green-500"
        tabIndex={-1}
      >
        {show ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
      </button>
    </div>
  );
};

export default PasswordInput;
