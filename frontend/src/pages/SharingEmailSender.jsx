import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Camera,
  Video,
  Send,
  ArrowLeft,
  Users,
  Share2,
  Shield,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { useToast } from "@/hooks/use-toast.js";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { useAuthStore } from "../store/authStore";
import { API_BASE_URL } from "../config";

const SharingEmailSender = () => {
  const [recipientEmails, setRecipientEmails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sosDetails, setSosDetails] = useState(null);
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) return;

    const fetchSosDetails = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/auth/getSosDetails`,
          {
            params: { email: user.email },
          }
        );

        const data = response.data;
        if (
          !data ||
          !data.emergencyContacts ||
          data.emergencyContacts.length === 0
        ) {
          navigate("/sos-details");
          return;
        }

        setSosDetails(data);

        const emails = data.emergencyContacts.map((c) => c.email || "");
        setRecipientEmails(emails);
      } catch (error) {
        console.error("Error fetching SOS details:", error);
        navigate("/sos-details");
        toast({
          title: "Fill Out the Form",
          description:
            "Make sure to complete the form before sharing your location and media.",
        });
      }
    };

    fetchSosDetails();
  }, [user]);

  const handleEmailChange = (index, value) => {
    const updated = [...recipientEmails];
    updated[index] = value;
    setRecipientEmails(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emails = recipientEmails
      .map((email) => email.trim())
      .filter((email) => email.includes("@"));

    if (!emails.length) {
      toast({
        title: "Error",
        description: "Please provide at least one valid email.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/email/sharing-email`, {
        emails,
      });

      const sessionId = res.data.sessionId;

      toast({
        title: "Invite Sent",
        description: `Invite sent to: ${emails.join(", ")}`,
      });

      localStorage.setItem(
        `mediaSession_${sessionId}`,
        JSON.stringify({
          profileEmail: sosDetails.useremail,
          sessionId,
          createdAt: new Date().toISOString(),
          status: "active",
        })
      );

      navigate(`/user-end/${sessionId}`);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to send invite. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 py-10 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-10">
            <Link
              to="/dashboard"
              className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
            <div className="flex items-center space-x-4 mb-2">
              <Share2 className="h-8 w-8 text-red-600" />

              <h1 className="text-3xl font-semibold text-foreground">
                Share Live Media and Location
              </h1>
            </div>
            <p className="text-muted-foreground">
              Send an invitation to share live audio/video streaming with
              someone you trust.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-4 mb-10">
            <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 shadow-sm">
              <CardContent className="p-4 text-center">
                <MapPin className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <h3 className="font-semibold text-yellow-700 dark:text-yellow-500 mb-1">
                  Live Location
                </h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-400">
                  Share real-time position
                </p>
              </CardContent>
            </Card>
            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 shadow-sm">
              <CardContent className="p-4 text-center">
                <Camera className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-blue-700 dark:text-blue-400 mb-1">
                  Live Media
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Real-time audio & video
                </p>
              </CardContent>
            </Card>
            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 shadow-sm">
              <CardContent className="p-4 text-center">
                <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-green-700 dark:text-green-400 mb-1">
                  Secure
                </h3>
                <p className="text-sm text-green-700 dark:text-green-300">
                  End-to-end encrypted
                </p>
              </CardContent>
            </Card>
            <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 shadow-sm">
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-purple-700 dark:text-purple-400 mb-1">
                  Trusted
                </h3>
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  Share with emergency contacts
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send Media Sharing Invite</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {recipientEmails.map((email, index) => (
                    <div key={index}>
                      <label className="text-sm font-medium block mb-2">
                        Recipient Email {index + 1} *
                      </label>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) =>
                          handleEmailChange(index, e.target.value)
                        }
                        placeholder="Enter email"
                        disabled
                        required
                      />
                    </div>
                  ))}

                  <Button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      "Sending Invite..."
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Media Sharing Invite
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Info Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  How It Works
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {[1, 2, 3, 4].map((step) => {
                  const steps = [
                    {
                      title: "Send Invite",
                      desc: "Your contact receives an email with a secure link",
                    },
                    {
                      title: "Start Streaming",
                      desc: "Begin sharing live audio/video through your browser",
                    },
                    {
                      title: "Real-Time View",
                      desc: "Recipient can track your location and stream",
                    },
                    {
                      title: "Get Help",
                      desc: "Recipient can provide assistance in real-time",
                    },
                  ];
                  return (
                    <div key={step} className="flex items-start space-x-3">
                      <div className="bg-red-100 dark:bg-red-900/20 w-6 h-6 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-xs font-bold text-red-600">
                          {step}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold">
                          {steps[step - 1].title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {steps[step - 1].desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SharingEmailSender;
