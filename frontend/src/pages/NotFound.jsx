
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Home, ArrowLeft, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent } from '@/components/ui/card.jsx';
import Header from '../components/Header';
import Footer from '../components/Footer';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md text-center">
          <Link to="/" className="inline-flex items-center space-x-2 mb-8">
            <div className="bg-red-600 p-3 rounded-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-foreground">SOS Alert</span>
          </Link>

          <Card className="shadow-xl border-0">
            <CardContent className="p-8">
              <div className="w-24 h-24 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="h-12 w-12 text-red-600" />
              </div>

              <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
              <h2 className="text-2xl font-bold text-foreground mb-4">Page Not Found</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                The page you're looking for doesn't exist or has been moved. 
                Don't worry, your safety is still our priority.
              </p>

              <div className="space-y-4">
                <Link to="/" className="block">
                  <Button className="w-full bg-red-600 hover:bg-red-700" size="lg">
                    <Home className="h-5 w-5 mr-2" />
                    Go to Homepage
                  </Button>
                </Link>
                
                <Button 
                  variant="outline" 
                  onClick={() => window.history.back()}
                  className="w-full"
                  size="lg"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Go Back
                </Button>
              </div>

              <div className="mt-8 pt-6 border-t">
                <p className="text-sm text-muted-foreground mb-4">Quick Links:</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <Link to="/about" className="text-red-600 hover:text-red-700 hover:underline">
                    About Us
                  </Link>
                  <Link to="/contact" className="text-red-600 hover:text-red-700 hover:underline">
                    Contact
                  </Link>
                  <Link to="/login" className="text-red-600 hover:text-red-700 hover:underline">
                    Login
                  </Link>
                  <Link to="/signup" className="text-red-600 hover:text-red-700 hover:underline">
                    Sign Up
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 p-4 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-800 dark:text-red-200">
              <strong>Emergency?</strong> Call 112 immediately for life-threatening situations.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
