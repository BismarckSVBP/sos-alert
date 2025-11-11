import React from "react";
import {} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import {
  Github,
  Linkedin,
  Mail,
  Code,
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

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.jsx";

const About = () => {
  const developers = [
    {
      id: 1,
      name: "Abhay Kumar Kasaudhan-(BismarckSVBP)",
      role: "Backend Developer and Coder",
      bio: "CSE B.Tech 3rd Year | Passionate about backend systems and solving real-world problems with code.",
      avatar: "/abhay.jpg",
      skills: [
        "C/C++",
        "Data Structures and Algorithms",
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "MySQL",
        "Python",
      ],
      social: {
        linkedin: "https://www.linkedin.com/in/abhay-kumar-4aa26b282",
        email: "bismarcksvbp@gmail.com",
      },
    },
  ];


  //for check

  const stats = [
    { icon: Users, label: "Active Users", value: "10,000+" },
    { icon: Shield, label: "Emergencies Handled", value: "500+" },
    { icon: Code, label: "Lines of Code", value: "50,000+" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="py-10 px-4 bg-gradient-to-br from-red-50 via-background to-orange-50 dark:from-red-950/20 dark:via-background dark:to-orange-950/20">
          <div className="container mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              About <span className="text-red-600">SOS Alert</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              SOS-Alert is built with a mission to save lives. Our platform
              empowers users to connect with their emergency contacts instantly
              through live location and media streaming.
            </p>
          </div>
        </section>
        <section className="py-4 px-4  bg-muted/50">
          <div className="container mx-auto ">
            <div className="text-center mb-2">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Meet Our Developer
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The passionate developer behind SOS Alert, working to make the
                world a safer place.
              </p>
            </div>
            <div className="grid lg:grid-cols-1 gap-8 justify-center items-center w-full min-h-screen">
              <div className="w-full max-w-md mx-auto">
                {developers.map((dev) => (
                  <Card
                    key={dev.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-0">
                      <div className="aspect-square bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20">
                        <img
                          src="Abhay.jpg"
                          alt={dev.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-foreground mb-1">
                          {dev.name}
                        </h3>
                        <p className="text-red-600 font-medium mb-3">
                          {dev.role}
                        </p>
                        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                          {dev.bio}
                        </p>

                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {dev.skills.map((skill) => (
                              <span
                                key={skill}
                                className="px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-xs rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex space-x-3">
                          <a
                            href={dev.social.linkedin}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Linkedin className="h-5 w-5" />
                          </a>
                          <a
                            href={`mailto:${dev.social.email}`}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Mail className="h-5 w-5" />
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Hero Section */}

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
              <Link to="/signup">
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

        {/* Mission Section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                To revolutionize emergency response through innovative
                technology, ensuring that help is always within reach when you
                need it most. We believe that everyone deserves to feel safe and
                connected, no matter where they are.
              </p>
              <div className="grid md:grid-cols-3 gap-8 text-left">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Innovation
                  </h3>
                  <p className="text-muted-foreground">
                    Leveraging cutting-edge technology to create intuitive
                    safety solutions.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Reliability
                  </h3>
                  <p className="text-muted-foreground">
                    Building robust systems that work when you need them most.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Community
                  </h3>
                  <p className="text-muted-foreground">
                    Connecting people and creating safer communities worldwide.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
      </main>

      <Footer />
    </div>
  );
};

export default About;
