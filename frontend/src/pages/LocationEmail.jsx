
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, MapPin, Mail, Send, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import { useToast } from "@/hooks/use-toast.js";


const LocationEmail = () => {
  const [formData, setFormData] = useState({
    recipientEmail: "",
    recipientName: "",
    message: "",
    duration: "60",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const sessionId = `loc_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;

      toast({
        title: "Location Invite Sent",
        description: `Emergency location sharing link sent to ${formData.recipientEmail}`,
      });

      // Redirect to location sharing page
      navigate(`/start-sharing/${sessionId}`);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header Section */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-2 mb-4">
              <div className="bg-red-600 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">
                SOS Alert
              </span>
            </Link>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Share Emergency Location
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Send a secure link to share your real-time location during an
              emergency situation
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-red-600" />
                    <span>Location Sharing Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="recipientEmail"
                          className="text-sm font-medium text-foreground"
                        >
                          Recipient Email *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                          <Input
                            id="recipientEmail"
                            type="email"
                            placeholder="Enter recipient's email"
                            className="pl-10"
                            value={formData.recipientEmail}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                recipientEmail: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="recipientName"
                          className="text-sm font-medium text-foreground"
                        >
                          Recipient Name
                        </label>
                        <div className="relative">
                          <Users className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                          <Input
                            id="recipientName"
                            type="text"
                            placeholder="Enter recipient's name"
                            className="pl-10"
                            value={formData.recipientName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                recipientName: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="duration"
                        className="text-sm font-medium text-foreground"
                      >
                        Sharing Duration (minutes)
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <select
                          id="duration"
                          className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                          value={formData.duration}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              duration: e.target.value,
                            })
                          }
                        >
                          <option value="15">15 minutes</option>
                          <option value="30">30 minutes</option>
                          <option value="60">1 hour</option>
                          <option value="120">2 hours</option>
                          <option value="360">6 hours</option>
                          <option value="1440">24 hours</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className="text-sm font-medium text-foreground"
                      >
                        Emergency Message
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Describe the emergency situation or add any important details..."
                        rows={4}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                      />
                    </div>

                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                      <div className="flex items-start space-x-2">
                        <MapPin className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-yellow-800 dark:text-yellow-200">
                            Location Sharing Info
                          </h4>
                          <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                            The recipient will receive a secure link to track
                            your real-time location. You can stop sharing at any
                            time during the emergency.
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-red-600 hover:bg-red-700"
                      disabled={isLoading}
                      size="lg"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Sending Location Invite...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2" />
                          Send Location Sharing Link
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar Info */}

          {/* Navigation */}
          <div className="mt-8 text-center space-x-4">
            <Link to="/dashboard">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LocationEmail;
