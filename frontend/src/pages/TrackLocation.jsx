import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import { MapPin, Navigation, Clock, Phone, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import socket from "@/socket/socket";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = { lat: 20.5937, lng: 78.9629 };

const TrackLocation = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [senderPosition, setSenderPosition] = useState(null);
  const [viewerPosition, setViewerPosition] = useState(null);
  const [locationHistory, setLocationHistory] = useState([]);
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(null);

  const mapRef = useRef(null);
  const durationInterval = useRef(null);
  const watchRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  // Join session and listen to updates
  useEffect(() => {
    socket.emit("join-location", sessionId);

    socket.on("receive-location", ({ latitude, longitude, timestamp }) => {
      const pos = { lat: latitude, lng: longitude };
      console.log("latitude", latitude);
      console.log("longitude", longitude);
      setSenderPosition(pos);
      setLocationHistory((prev) => [...prev, pos]);
      setLastUpdate(new Date(timestamp || Date.now()));
    });

    socket.on("terminate-location", () => {
      toast({
        title: "Location Sharing Ended",
        description: "The sender has stopped sharing their location.",
      });
      navigate("/");
    });

    return () => {
      socket.off("receive-location");
      socket.off("terminate-location");
    };
  }, [sessionId, navigate, toast]);

  // Track viewer location
  useEffect(() => {
    if (navigator.geolocation) {
      watchRef.current = navigator.geolocation.watchPosition(
        (pos) => {
          setViewerPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => console.error("Viewer location error:", err),
        { enableHighAccuracy: true }
      );
    }

    return () => {
      if (watchRef.current) navigator.geolocation.clearWatch(watchRef.current);
    };
  }, []);

  // Directions routing
  useEffect(() => {
    if (senderPosition && viewerPosition && window.google?.maps) {
      const service = new window.google.maps.DirectionsService();
      service.route(
        {
          origin: viewerPosition,
          destination: senderPosition,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK") {
            setDirections(result);
            const leg = result.routes[0].legs[0];
            setDistance(leg.distance.value);
          }
        }
      );
    }
  }, [senderPosition, viewerPosition]);

  // Duration counter
  useEffect(() => {
    if (senderPosition) {
      durationInterval.current = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(durationInterval.current);
  }, [senderPosition]);

  const formatDistance = (m) =>
    m < 1000 ? `${Math.round(m)}m` : `${(m / 1000).toFixed(1)}km`;
  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(
      2,
      "0"
    )}`;

  if (!isLoaded)
    return <div className="text-center p-10">Loading Google Map...</div>;

  return (
    <div className="min-h-screen bg-background">
      <main className="py-4 px-4">
        <div className="container max-w-7xl mx-auto">
          <p className="text-center mb-4 text-muted-foreground">
            Session: <Badge variant="outline">{sessionId}</Badge>
          </p>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Map */}
            <div className="lg:col-span-3">
              <Card>
                <CardContent className="p-0">
                  <div className="h-96 md:h-[500px] rounded-lg overflow-hidden">
                    <GoogleMap
                      mapContainerStyle={containerStyle}
                      center={viewerPosition || senderPosition || defaultCenter}
                      zoom={15}
                      ref={mapRef}
                    >
                      {senderPosition && (
                        <Marker position={senderPosition} label="S" />
                      )}
                      {viewerPosition && (
                        <Marker position={viewerPosition} label="U" />
                      )}
                      {directions && (
                        <DirectionsRenderer
                          directions={directions}
                          options={{ suppressMarkers: true }}
                        />
                      )}
                    </GoogleMap>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Info panel */}
            <div className="space-y-4">
              <Card>
                <CardContent className="text-center p-4">
                  <Clock className="mx-auto mb-2 text-green-600" />
                  <div className="text-2xl font-bold">
                    {formatTime(duration)}
                  </div>
                  <p className="text-sm">Duration</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Location Info</CardTitle>
                </CardHeader>
                <CardContent>
                  {senderPosition && (
                    <>
                      <p>Lat: {senderPosition.lat.toFixed(6)}</p>
                      <p>Lng: {senderPosition.lng.toFixed(6)}</p>
                    </>
                  )}
                  <p>Points: {locationHistory.length}</p>
                  {lastUpdate && (
                    <p>Last Update: {lastUpdate.toLocaleTimeString()}</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Emergency Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full bg-red-600 text-white hover:bg-red-700">
                    <Phone className="mr-2" /> Call 112
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: "Track My Location",
                          text: "Live tracker link",
                          url: window.location.href,
                        });
                      } else {
                        navigator.clipboard.writeText(window.location.href);
                        toast({ title: "Link copied to clipboard" });
                      }
                    }}
                  >
                    <Share className="mr-2" /> Share Tracker
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      if (!viewerPosition && !senderPosition) {
                        toast({
                          title: "Locations Unavailable",
                          description:
                            "Both your and the sender’s locations are still loading. Please wait a few seconds.",
                          variant: "destructive",
                        });
                        return;
                      }

                      if (!viewerPosition) {
                        toast({
                          title: "Your Location Missing",
                          description:
                            "Please allow location access and wait for your location to load.",
                          variant: "destructive",
                        });
                        return;
                      }

                      if (!senderPosition) {
                        toast({
                          title: "Under Development.",
                          description: "Process is in under Development.",
                          variant: "destructive",
                        });
                        return;
                      }

                      const url = `https://www.google.com/maps/dir/?api=1&origin=${viewerPosition.lat},${viewerPosition.lng}&destination=${senderPosition.lat},${senderPosition.lng}&travelmode=driving`;
                      window.open(url, "_blank");
                    }}
                  >
                    <MapPin className="mr-2" /> Get Directions
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TrackLocation;
