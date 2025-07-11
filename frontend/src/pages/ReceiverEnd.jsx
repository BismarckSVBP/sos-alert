import React from "react";
import MediaWatching from "./MediaWatching";
import TrackLocation from "./TrackLocation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Video, MapPin } from "lucide-react";

const ReceiverEnd = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-background to-green-50 dark:from-blue-950/20 dark:via-background dark:to-green-950/20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Emergency <span className="text-blue-600">Monitoring</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            View live media and track the real-time location shared by your
            contact in an emergency situation.
          </p>
        </div>
      </section>

      {/* Media Watching Section */}
      <section className="py-5 px-4 bg-muted/50">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full mb-4">
            <Video className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Live Media Feed
          </h2>
          <p className="text-muted-foreground">
            Watch the real-time video and audio being broadcasted from the
            sender.
          </p>
        </div>
      </section>
      <MediaWatching />

      {/* Location Tracking Section */}
      <section className="py-5 px-4 bg-muted/50">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full mb-4">
            <MapPin className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Real-Time Location Tracking
          </h2>
          <p className="text-muted-foreground">
            Follow the exact path of the sender to assist them in real-time.
          </p>
        </div>
      </section>
      <TrackLocation />

      <Footer />
    </div>
  );
};

export default ReceiverEnd;
