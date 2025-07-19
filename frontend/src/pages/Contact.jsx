

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { useContactStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; // Required for `toast.success()` and `toast.error()`
import { Link } from "react-router-dom";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const navigate = useNavigate();
  const { contactUs, isLoading } = useContactStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    try {
      await contactUs(email, name, message);
      toast.success("Message sent successfully.");
      setFormData({ name: "", email: "", message: "" });
      navigate("/");
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "helpsosalert@gmail.com",
      description: "Send us an email anytime",
    },
   
    {
      icon: MapPin,
      title: "Visit Us",
      content: "Basti, Uttar Pradesh, India",
      description: "Our headquarters",
    },
    {
      icon: Clock,
      title: "Support Hours",
      content: "24/7 Emergency Support",
      description: "We're always here for emergencies",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-red-50 via-background to-orange-50 dark:from-red-950/20 dark:via-background dark:to-orange-950/20">
          <div className="container mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Contact <span className="text-red-600">Us</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Get in touch with our team. We're here to help with any questions
              about SOS Alert or to provide support when you need it most.
            </p>
          </div>
        </section>

        {/* Contact Info Grid */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {contactInfo.map((info, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="bg-red-100 dark:bg-red-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <info.icon className="h-8 w-8 text-red-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {info.title}
                    </h3>
                    <p className="text-foreground font-medium mb-1">
                      {info.content}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {info.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div>
                  <h2 className="text-4xl font-bold text-foreground mb-6">
                    Send us a Message
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    Have a question or need support? Fill out the form and we'll
                    get back to you as soon as possible. For emergencies, please
                    call 112 immediately.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-red-100 dark:bg-red-900/20 p-2 rounded-lg">
                        <Mail className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">
                          Quick Response
                        </h4>
                        <p className="text-muted-foreground text-sm">
                          We typically respond within 24 hours
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-red-100 dark:bg-red-900/20 p-2 rounded-lg">
                        <Phone className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">
                          24/7 Emergency Support
                        </h4>
                        <p className="text-muted-foreground text-sm">
                          Critical issues are handled immediately
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Card className="shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-2xl">Get in Touch</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="text-sm font-medium text-foreground mb-2 block"
                        >
                          Full Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="text-sm font-medium text-foreground mb-2 block"
                        >
                          Email Address
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your email address"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="text-sm font-medium text-foreground mb-2 block"
                        >
                          Message
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Tell us how we can help you..."
                          rows={6}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              message: e.target.value,
                            })
                          }
                          required
                          className="resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-700"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          "Sending..."
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Notice */}
        <section className="py-12 px-4 bg-red-600">
          <div className="container mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Emergency Situations
            </h3>
            <p className="text-red-100 mb-6 max-w-2xl mx-auto">
              If you're experiencing an emergency, don't wait for email support.
              Call emergency services immediately or use the SOS Alert app.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:112">
                <Button variant="secondary" size="lg">
                  Call 112 Now
                </Button>
              </a>

              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-red-600"
                onClick={() => navigate("/dashboard")}
              >
                Open SOS Alert App
              </Button>
              
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
