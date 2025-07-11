import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MediaSharing from "./MediaSharing";
import StartLocationSharing from "./StartLocationSharing";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Video, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast.js";

const UserEnd = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // This cleanup runs on unmount/navigation
    return () => {
      toast({
        title: "Streaming Stopped",
        description:
          "You have navigated away from the Emergency Broadcasting page. Please send a new link to share your location and media, as the old link is no longer valid.",
      });
    };
  }, [toast]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-red-50 via-background to-orange-50 dark:from-red-950/20 dark:via-background dark:to-orange-950/20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Emergency <span className="text-red-600">Broadcasting</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start sharing your live stream and real-time location to alert your
            trusted contacts during an emergency.
          </p>
        </div>
      </section>

      {/* Media Streaming Section */}
      <section className="py-5 px-4 bg-muted/50">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full mb-4">
            <Video className="h-6 w-6 text-purple-600" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Live Media Streaming
          </h2>
          <p className="text-muted-foreground">
            Stream your camera and microphone to show your emergency situation
            in real time.
          </p>
        </div>
      </section>

      <MediaSharing />

      {/* Location Sharing Section */}
      <section className="py-5 px-4 bg-muted/50">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full mb-4">
            <MapPin className="h-6 w-6 text-purple-600" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Live Location Sharing
          </h2>
          <p className="text-muted-foreground">
            Share your exact location with emergency contacts, so they can reach
            you faster and stay updated.
          </p>
        </div>
      </section>

      <StartLocationSharing />
      <Footer />
    </div>
  );
};

export default UserEnd;
