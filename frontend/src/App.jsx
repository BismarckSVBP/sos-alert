import { Toaster } from "@/components/ui/toaster.jsx";
import { Toaster as Sonner } from "@/components/ui/sonner.jsx";
import { TooltipProvider } from "@/components/ui/tooltip.jsx";
import LoadingSpinner from "@/components/ui/LoadingSpinner.jsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import SosDetailsForm from "./pages/SosDetailsForm";
import UpdateSosDetails from "./pages/UpdateSosDetails";
import AdminPanel from "./pages/AdminPanel";
import SharingEmailSender from "./pages/SharingEmailSender";
import UserEnd from "./pages/UserEnd";
import ReceiverEnd from "./pages/ReceiverEnd";
import LocationEmail from "./pages/LocationEmail";
import StartLocationSharing from "./pages/StartLocationSharing";
import TrackLocation from "./pages/TrackLocation";
import NotFound from "./pages/NotFound";
import SosDetail from "./pages/SosDetail";

import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";
import { ADMIN_EMAIL } from "./config";

const queryClient = new QueryClient();

// ✅ Protected Route
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user?.isVerified) return <Navigate to="/verify-email" replace />;

  return children;
};

// ✅ Redirect Authenticated User
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) return null;
  if (isAuthenticated && user?.isVerified) return <Navigate to="/" replace />;

  return children;
};

// ✅ Admin Route
const AdminRoute = ({ children }) => {
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) return null;

  const isAdmin =
    user?.email?.trim().toLowerCase() === ADMIN_EMAIL.trim().toLowerCase();

  return isAuthenticated && isAdmin ? children : <Navigate to="/" replace />;
};

const App = () => {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
       <LoadingSpinner/>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* 🌐 Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              {/* 🔐 Auth Routes */}
              <Route
                path="/login"
                element={
                  <RedirectAuthenticatedUser>
                    <Login />
                  </RedirectAuthenticatedUser>
                }
              />
              <Route
                path="/signup"
                element={
                  <RedirectAuthenticatedUser>
                    <Signup />
                  </RedirectAuthenticatedUser>
                }
              />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/reset-password/:token"
                element={<ResetPassword />}
              />

              {/* 🔐 Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/sos-details"
                element={
                  <ProtectedRoute>
                    <SosDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/sharing-email"
                element={
                  <ProtectedRoute>
                    <SharingEmailSender />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user-end/:sessionId"
                element={
                  <ProtectedRoute>
                    <UserEnd />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/receiver-end/:sessionId"
                element={
               
                    <ReceiverEnd />
                
                }
              />
              {/* 👮 Admin Route */}
              <Route
                path="/admin-panel"
                element={
                  <AdminRoute>
                    <AdminPanel />
                  </AdminRoute>
                }
              />

              {/* ❌ 404 Fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
