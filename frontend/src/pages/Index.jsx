import React from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  MapPin,
  Video,
  Users,
  Clock,
  CheckCircle,
  Phone,
  Heart,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-gradient-to-br from-red-50 via-background to-orange-50 dark:from-red-950/20 dark:via-background dark:to-orange-950/20">
          <div className="container mx-auto max-w-6xl text-center">
            <div className="max-w-3xl mx-auto">
              <Badge
                variant="outline"
                className="mb-4 text-red-600 border-red-200"
              >
                Emergency Safety Platform
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
                Your Safety, Our <span className="text-red-600">Priority</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Share your live location and stream audio/video to trusted
                contacts during emergencies. Stay connected when it matters
                most.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/dashboard">
                  <Button
                    size="lg"
                    className="bg-red-600 hover:bg-red-700 text-lg px-8 py-3"
                  >
                    <Shield className="h-5 w-5 mr-2" />
                    Get Started Free
                  </Button>
                </Link>
                <Link to="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 py-3"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Emergency Features Built for Your Safety
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Comprehensive tools to keep you connected with your emergency
                contacts during critical situations.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-blue-600">
                    Live Location Sharing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Share your real-time location with trusted contacts. They
                    can track your movement and get directions to reach you.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      Real-time GPS tracking
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      Secure encrypted sharing
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      Turn-by-turn directions
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-4">
                    <Video className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-purple-600">
                    Live Media Streaming
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Stream live audio and video to show your situation to
                    emergency contacts in real-time.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      HD video streaming
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      Crystal clear audio
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      Multiple viewer support
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-red-600" />
                  </div>
                  <CardTitle className="text-red-600">
                    Emergency Contacts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Manage your emergency contact details and medical
                    information for quick access during emergencies.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      Multiple contacts
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      Medical information
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      Instant notifications
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-4 bg-muted/50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Simple Steps to Stay Safe
              </h2>
              <p className="text-xl text-muted-foreground">
                Get emergency help in just three simple steps
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                  1
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Setup Your Profile
                </h3>
                <p className="text-muted-foreground">
                  Create your account and add emergency contacts, medical
                  information, and personal details.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                  2
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Send Emergency Link
                </h3>
                <p className="text-muted-foreground">
                  In an emergency, quickly send your location or media streaming
                  link to trusted contacts.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                  3
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Get Help Fast
                </h3>
                <p className="text-muted-foreground">
                  Your contacts can see your location, watch your stream, and
                  coordinate help effectively.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-red-600 mb-2">24/7</div>
                <div className="text-muted-foreground">Always Available</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-red-600 mb-2">
                  &lt;30s
                </div>
                <div className="text-muted-foreground">
                  Average Response Time
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-red-600 mb-2">100%</div>
                <div className="text-muted-foreground">Secure & Private</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-red-600 to-orange-600">
          <div className="container mx-auto max-w-4xl text-center text-white">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Enhance Your Safety?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands who trust SOS Alert for their emergency
              preparedness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-red-600 bg-white hover:bg-gray-100"
                >
                  <Shield className="h-5 w-5 mr-2" />
                  Start Free Today
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-red-600"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Emergency Notice */}
        <section className="py-12 px-4 bg-red-50 dark:bg-red-900/10 border-t border-red-200 dark:border-red-800">
          <div className="container mx-auto max-w-4xl">
            <div className="flex items-center justify-center space-x-3 text-red-800 dark:text-red-200">
              <AlertTriangle className="h-6 w-6" />
              <p className="text-center font-medium">
                <strong>Emergency Notice:</strong> This is a demo application.
                In real emergencies, always call 112 or your local emergency
                services immediately.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
