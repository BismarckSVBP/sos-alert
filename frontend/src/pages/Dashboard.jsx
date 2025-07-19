import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Shield,
  User,
  Settings,
  LogOut,
  AlertTriangle,
  FileText,
  Share2,
  MapPin,
  Video,
  Camera,
} from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { useToast } from "@/hooks/use-toast.js";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuthStore } from "../store/authStore";
import axios from "axios";
import { API_BASE_URL } from "../config";

const Dashboard = () => {
  const [sosDetails, setSosDetails] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { logout, userEmail, user } = useAuthStore();

  // Load user & SOS details from localStorage
  useEffect(() => {
    if (!user) return;

    const fetchSosDetails = async () => {
      try {
        console.log("Calling /getSosDetails with email:", user.email);
        const response = await axios.get(`${API_BASE_URL}/api/auth/getSosDetails`, {
          params: { email: user.email },
        });

        setSosDetails(response.data || null);
      } catch (error) {
        console.error("Error fetching SOS details:", error);
        setSosDetails(null);
      }
    };

    fetchSosDetails();
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out",
      });
      navigate("/");
    } catch (err) {
      toast({
        title: "Logout Failed",
        description: "Something went wrong while logging out.",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">
                  Welcome back, {user.name}!
                </h1>
                <p className="text-muted-foreground">
                  Your safety dashboard - Manage your emergency settings and
                  share your location or media when needed.
                </p>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>

            {/* Status Card */}
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-700 dark:text-green-300 font-medium">
                    System Status: Active & Secure
                  </span>
                  <Badge
                    variant="outline"
                    className="text-green-600 border-green-300"
                  >
                    Online
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Emergency Settings */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-red-600">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Emergency Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">SOS Details</span>
                    <Badge variant={sosDetails ? "default" : "secondary"}>
                      {sosDetails ? "Complete" : "Incomplete"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {sosDetails
                      ? "Your emergency details are up to date"
                      : "Please fill in your emergency contact details"}
                  </p>
                </div>

                <div className="space-y-2">
                  <Link
                    to={
                      "/sos-details"
                    }
                    className="block"
                  >
                    <Button className="w-full bg-red-600 hover:bg-red-700">
                      <FileText className="h-4 w-4 mr-2" />
                      {sosDetails ? "Update SOS Details" : "Fill SOS Details"}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            
            {/* Media Sharing */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-600">
                  <Share2 className="h-5 w-5 mr-2" />
                  Location & Media Sharing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2">
                    Live Audio/Video
                  </h4>
                  <p className="text-sm text-purple-700 dark:text-purple-300">
                    Stream live audio and video & Share your live location to
                    emergency contacts in real-time
                  </p>
                </div>

                <Link to="/sharing-email" className="block">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Link
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* User Info Section */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Account Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Account Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Full Name
                  </label>
                  <p className="text-foreground">{user.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Email Address
                  </label>
                  <p className="text-foreground">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Account Status
                  </label>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                      Verified
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Active since today
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Emergency Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                {sosDetails ? (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Primary Contact
                      </label>
                      <p className="text-foreground">
                        {sosDetails.emergencyContacts[0]?.name || "Not set"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {sosDetails.emergencyContacts[0]?.email || "No Email"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Medical Info
                      </label>
                      <p className="text-foreground">
                        {sosDetails.personalInfo?.bloodType
                          ? `Blood Type: ${sosDetails.personalInfo.bloodType}`
                          : "Not provided"}
                      </p>
                    </div>
                    <div className="pt-4 border-t">
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                        Profile Complete
                      </Badge>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">
                      Emergency Details Needed
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Complete your emergency profile to ensure quick response
                      in critical situations.
                    </p>
                    <Link to="/sos-details">
                      <Button className="bg-red-600 hover:bg-red-700">
                        Complete Profile
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Emergency Notice */}
          <div className="mt-8">
            <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-red-800 dark:text-red-200 mb-1">
                      Emergency Information
                    </h3>
                    <p className="text-sm text-red-700 dark:text-red-300">
                      This is a demonstration app. In real emergencies,
                      immediately call <strong>112</strong> or your local
                      emergency services. Use the location and media sharing
                      features to keep trusted contacts informed of your
                      situation.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
