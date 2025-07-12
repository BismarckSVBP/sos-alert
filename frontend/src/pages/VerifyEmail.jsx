// import React, { useEffect, useRef, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Shield, Mail, ArrowLeft } from 'lucide-react';
// import { Button } from '@/components/ui/button.jsx';
// import { Input } from '@/components/ui/input.jsx';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
// import { useToast } from '@/hooks/use-toast.js';
// import ThemeToggle from '../components/ThemeToggle';
// import { useAuthStore } from '../store/authStore';

// const VerifyEmail = () => {
//   const [otp, setOtp] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [isResending, setIsResending] = useState(false);
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   const { userEmail, verifyEmail, resendOTP, error } = useAuthStore();

//   useEffect(() => {
//     if (!userEmail) {
//       toast({
//         title: "Signup Required",
//         description: "Please signup first to verify your email.",
//         variant: "destructive",
//       });
//       navigate("/signup");
//     }
//   }, [userEmail, navigate, toast]);

//   useEffect(() => {
//     if (error) {
//       toast({
//         title: "Verification Failed",
//         description: error,
//         variant: "destructive",
//       });
//     }
//   }, [error, toast]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (otp.length !== 6) {
//       toast({
//         title: "Incomplete OTP",
//         description: "Please enter the full 6-digit verification code.",
//         variant: "destructive",
//       });
//       return;
//     }

//     setIsLoading(true);
//     try {
//       await verifyEmail(otp);
//       toast({
//         title: "Email Verified",
//         description: "Welcome to SOS Alert! Your account is now active.",
//       });
//       navigate("/dashboard");
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleResendOTP = async () => {
//     if (!userEmail) {
//       toast({
//         title: "No Email",
//         description: "Please sign up again.",
//         variant: "destructive",
//       });
//       navigate("/signup");
//       return;
//     }

//     setIsResending(true);
//     try {
//       await resendOTP(userEmail);
//       toast({
//         title: "OTP Resent",
//         description: "A new code has been sent to your email.",
//       });
//     } catch (err) {
//       toast({
//         title: "Resend Failed",
//         description: "Unable to resend OTP. Try again later.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsResending(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-red-50 via-background to-orange-50 dark:from-red-950/20 dark:via-background dark:to-orange-950/20 flex items-center justify-center p-4">
//       <div className="absolute top-4 right-4">
//         <ThemeToggle />
//       </div>
      
//       <div className="w-full max-w-md">
//         <div className="text-center mb-8">
//           <Link to="/" className="inline-flex items-center space-x-2 mb-4">
//             <div className="bg-red-600 p-2 rounded-lg">
//               <Shield className="h-6 w-6 text-white" />
//             </div>
//             <span className="text-xl font-bold text-foreground">SOS Alert</span>
//           </Link>
//           <h1 className="text-3xl font-bold text-foreground mb-2">Verify Your Email</h1>
//           <p className="text-muted-foreground">
//             We've sent a verification code to your email address
//           </p>
//         </div>

//         <Card className="shadow-xl border-0">
//           <CardHeader>
//             <CardTitle className="text-2xl text-center flex items-center justify-center">
//               <Mail className="h-6 w-6 mr-2" />
//               Email Verification
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="space-y-2">
//                 <label htmlFor="otp" className="text-sm font-medium text-foreground">
//                   Enter 6-digit verification code
//                 </label>
//                 <Input
//                   id="otp"
//                   type="text"
//                   placeholder="123456"
//                   className="text-center text-lg tracking-widest"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
//                   maxLength="6"
//                   required
//                 />
//               </div>

//               <Button
//                 type="submit"
//                 className="w-full bg-red-600 hover:bg-red-700"
//                 disabled={isLoading || otp.length !== 6}
//               >
//                 {isLoading ? "Verifying..." : "Verify Email"}
//               </Button>
//             </form>

//             <div className="mt-6 text-center">
//               <p className="text-sm text-muted-foreground mb-2">
//                 Didn't receive the code?
//               </p>
//               <Button
//                 variant="ghost"
//                 onClick={handleResendOTP}
//                 disabled={isResending}
//                 className="text-red-600 hover:text-red-700"
//               >
//                 {isResending ? "Resending..." : "Resend OTP"}
//               </Button>
//             </div>

//             <div className="mt-6 text-center">
//               <Link to="/signup" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
//                 <ArrowLeft className="h-4 w-4 mr-1" />
//                 Back to Sign Up
//               </Link>
//             </div>
//           </CardContent>
//         </Card>

//         <div className="mt-6 text-center text-sm text-muted-foreground">
//           <p>For emergency assistance, call 112</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VerifyEmail;
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Mail, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { useToast } from '@/hooks/use-toast.js';
import ThemeToggle from '../components/ThemeToggle';
import { useAuthStore } from '../store/authStore';

const VerifyEmail = () => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const { userEmail, verifyEmail, resendOTP, error } = useAuthStore();

  useEffect(() => {
    if (!userEmail) {
      toast({
        title: "Signup Required",
        description: "Please signup first to verify your email.",
        variant: "destructive",
      });
      navigate("/signup");
    }
  }, [userEmail, navigate, toast]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Verification Failed",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast({
        title: "Incomplete OTP",
        description: "Please enter the full 6-digit verification code.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await verifyEmail(otp);
      toast({
        title: "Email Verified",
        description: "Welcome to SOS Alert! Your account is now active.",
      });
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!userEmail) {
      toast({
        title: "No Email",
        description: "Please sign up again.",
        variant: "destructive",
      });
      navigate("/signup");
      return;
    }

    setIsResending(true);
    try {
      await resendOTP(userEmail);
      toast({
        title: "OTP Resent",
        description: "A new code has been sent to your email.",
      });
    } catch (err) {
      toast({
        title: "Resend Failed",
        description: "Unable to resend OTP. Try again later.",
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-background to-orange-50 dark:from-red-950/20 dark:via-background dark:to-orange-950/20 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-4">
            <div className="bg-red-600 p-2 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">SOS Alert</span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Verify Your Email</h1>
          <p className="text-muted-foreground">
            We've sent a verification code to your email address
          </p>
          {userEmail && (
            <p className="text-sm mt-1">
              <span className="font-semibold text-muted-foreground">To:</span>{' '}
              <span className="font-bold text-red-800 dark:text-red-400">{userEmail}</span>
            </p>
          )}
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-2xl text-center flex items-center justify-center">
              <Mail className="h-6 w-6 mr-2" />
              Email Verification
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="otp" className="text-sm font-medium text-foreground">
                  Enter 6-digit verification code
                </label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="123456"
                  className="text-center text-lg tracking-widest"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  maxLength="6"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700"
                disabled={isLoading || otp.length !== 6}
              >
                {isLoading ? "Verifying..." : "Verify Email"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Didn't receive the code?
              </p>
              <Button
                variant="ghost"
                onClick={handleResendOTP}
                disabled={isResending}
                className="text-red-600 hover:text-red-700"
              >
                {isResending ? "Resending..." : "Resend OTP"}
              </Button>
            </div>

            <div className="mt-6 text-center">
              <Link to="/signup" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Sign Up
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>For emergency assistance, call 112</p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
