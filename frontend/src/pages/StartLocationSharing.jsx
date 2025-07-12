// import React, { useEffect, useRef, useState } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import {
//   GoogleMap,
//   Marker,
//   Polyline,
//   useJsApiLoader,
// } from "@react-google-maps/api";
// import { Users, Clock, Square, Play, Trash2, Navigation } from "lucide-react";
// import { Button } from "@/components/ui/button.jsx";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card.jsx";
// import { Badge } from "@/components/ui/badge.jsx";
// import { useToast } from "@/hooks/use-toast.js";
// import socket from "@/socket/socket";

// const containerStyle = { width: "100%", height: "100%" };
// const defaultCenter = { lat: 20.5937, lng: 78.9629 };

// const StartLocationSharing = () => {
//   const { sessionId } = useParams();
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   const [isSharing, setIsSharing] = useState(false);
//   const [isPaused, setIsPaused] = useState(false);
//   const [currentPosition, setCurrentPosition] = useState(null);
//   const [locationHistory, setLocationHistory] = useState([]);
//   const [viewers, setViewers] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [accuracy, setAccuracy] = useState(0);
//   const [initialFixDone, setInitialFixDone] = useState(false);

//   const mapRef = useRef(null);
//   const watchIdRef = useRef(null);
//   const durationIntervalRef = useRef(null);

//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
//   });

//   useEffect(() => {
//     socket.emit("join-location", sessionId);
//   }, [sessionId]);

//   useEffect(() => {
//     if (isSharing && !isPaused) {
//       durationIntervalRef.current = setInterval(() => {
//         setDuration((prev) => prev + 1);
//       }, 1000);
//     }
//     return () => clearInterval(durationIntervalRef.current);
//   }, [isSharing, isPaused]);

//   const startLocationSharing = () => {
//     if (!navigator.geolocation) {
//       return toast({
//         title: "Geolocation not supported",
//         description: "Please enable location services",
//         variant: "destructive",
//       });
//     }
//     toast({ title: "Getting your location..." });
//     getInitialLocation();
//   };

//   const getInitialLocation = () => {
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const { latitude, longitude, accuracy } = pos.coords;
//         const position = { lat: latitude, lng: longitude };
//         setCurrentPosition(position);
//         setAccuracy(accuracy);
//         setLocationHistory([position]);
//         setInitialFixDone(true);
//         socket.emit("send-location", {
//           sessionId,
//           latitude,
//           longitude,
//           timestamp: Date.now(),
//         });
//         toast({ title: "Initial location acquired." });
//         startWatchLocation();
//       },
//       (err) =>
//         toast({
//           title: "Location Error",
//           description: err.message,
//           variant: "destructive",
//         }),
//       { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
//     );
//   };

//   const startWatchLocation = () => {
//     watchIdRef.current = navigator.geolocation.watchPosition(
//       (pos) => {
//         const { latitude, longitude, accuracy } = pos.coords;
//         const position = { lat: latitude, lng: longitude };
//         setCurrentPosition(position);
//         setAccuracy(accuracy);
//         setLocationHistory((prev) => [...prev, position]);
//         socket.emit("send-location", {
//           sessionId,
//           latitude,
//           longitude,
//           timestamp: Date.now(),
//         });

//         if (!isSharing && !initialFixDone) {
//           setIsSharing(true);
//           setViewers(Math.floor(Math.random() * 3) + 1);
//           toast({ title: "Live location sharing started." });
//         }
//       },
//       (err) =>
//         toast({
//           title: "Tracking Error",
//           description: err.message,
//           variant: "destructive",
//         }),
//       { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
//     );
//   };

//   const pauseLocationSharing = () => {
//     if (watchIdRef.current) {
//       navigator.geolocation.clearWatch(watchIdRef.current);
//       watchIdRef.current = null;
//     }
//     setIsPaused(true);
//     socket.emit("pause-location", { sessionId });
//     toast({ title: "Paused", description: "Location sharing paused" });
//   };

//   const resumeLocationSharing = () => {
//     setIsPaused(false);
//     startWatchLocation();
//     toast({ title: "Resumed", description: "Location sharing resumed" });
//   };

//   const stopLocationSharing = () => {
//     if (watchIdRef.current)
//       navigator.geolocation.clearWatch(watchIdRef.current);
//     socket.emit("terminate-location", { sessionId });
//     setIsSharing(false);
//     setIsPaused(false);
//     setDuration(0);
//     setLocationHistory([]);
//     setCurrentPosition(null);
//     setInitialFixDone(false);
//     toast({ title: "Stopped", description: "Location sharing stopped" });
    
//     navigate("/");
//   };

//   const formatTime = (s) =>
//     `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(
//       2,
//       "0"
//     )}`;
//   const formatAccuracy = (acc) =>
//     acc < 1000 ? `${Math.round(acc)}m` : `${(acc / 1000).toFixed(1)}km`;

//   if (!isLoaded)
//     return <div className="text-center p-10">Loading Google Map...</div>;

//   return (
//     <div className="min-h-screen bg-background flex flex-col">
//       <main className="flex-1 py-4 px-4">
//         <div className="container mx-auto max-w-7xl">
//           <h1 className="text-3xl font-bold text-center mb-4">
//             Emergency Location Sharing
//           </h1>
//           <div className="text-center mb-4 text-muted-foreground">
//             Session: <Badge variant="outline">{sessionId}</Badge>
//           </div>

//           <div className="grid lg:grid-cols-4 gap-6">
//             <div className="lg:col-span-3">
//               <Card>
//                 <CardContent className="p-0">
//                   <div className="h-96 md:h-[500px] overflow-hidden rounded-lg">
//                     <GoogleMap
//                       mapContainerStyle={containerStyle}
//                       center={currentPosition || defaultCenter}
//                       zoom={16}
//                       ref={mapRef}
//                     >
//                       {currentPosition && <Marker position={currentPosition} />}
//                       {locationHistory.length > 1 && (
//                         <Polyline
//                           path={locationHistory}
//                           options={{ strokeColor: "#34a853", strokeWeight: 4 }}
//                         />
//                       )}
//                     </GoogleMap>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card className="mt-4">
//                 <CardContent className="p-4 text-center flex gap-4 justify-center flex-wrap">
//                   {!isSharing && !initialFixDone ? (
//                     <Button
//                       onClick={startLocationSharing}
//                       className="bg-red-600 hover:bg-red-700"
//                     >
//                       <Navigation className="mr-2" /> Start Sharing
//                     </Button>
//                   ) : (
//                     <>
//                       {isPaused ? (
//                         <Button onClick={resumeLocationSharing}>
//                           <Play className="mr-2" /> Resume
//                         </Button>
//                       ) : (
//                         <Button
//                           onClick={pauseLocationSharing}
//                           variant="outline"
//                         >
//                           <Square className="mr-2" /> Pause
//                         </Button>
//                       )}
//                       <Button
//                         onClick={stopLocationSharing}
//                         variant="destructive"
//                       >
//                         <Trash2 className="mr-2" /> Stop
//                       </Button>
//                     </>
//                   )}
//                 </CardContent>
//               </Card>
//             </div>

//             <div className="space-y-4">
            
//               <Card>
//                 <CardContent className="text-center p-4">
//                   <Clock className="mx-auto mb-2" />
//                   <div className="text-2xl font-bold">
//                     {formatTime(duration)}
//                   </div>
//                   <p>Duration</p>
//                 </CardContent>
//               </Card>
//               {currentPosition && (
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Location Info</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <p>Lat: {currentPosition.lat.toFixed(6)}</p>
//                     <p>Lng: {currentPosition.lng.toFixed(6)}</p>
//                     <p>Accuracy: {formatAccuracy(accuracy)}</p>
//                     <p>Points: {locationHistory.length}</p>
//                   </CardContent>
//                 </Card>
//               )}
//             </div>
//           </div>

          
//         </div>
//       </main>
//     </div>
//   );
// };

// export default StartLocationSharing;
import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  GoogleMap,
  Marker,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Users, Clock, Square, Play, Trash2, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { useToast } from "@/hooks/use-toast.js";
import socket from "@/socket/socket";

const containerStyle = { width: "100%", height: "100%" };
const defaultCenter = { lat: 20.5937, lng: 78.9629 };

const StartLocationSharing = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isSharing, setIsSharing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [locationHistory, setLocationHistory] = useState([]);
  const [viewers, setViewers] = useState(0);
  const [duration, setDuration] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [initialFixDone, setInitialFixDone] = useState(false);

  const mapRef = useRef(null);
  const watchIdRef = useRef(null);
  const durationIntervalRef = useRef(null);
  const hasStartedSharingRef = useRef(false); // ✅ FIX: track if sharing toast was shown

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    socket.emit("join-location", sessionId);
  }, [sessionId]);

  useEffect(() => {
    if (isSharing && !isPaused) {
      durationIntervalRef.current = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(durationIntervalRef.current);
  }, [isSharing, isPaused]);

  const startLocationSharing = () => {
    if (!navigator.geolocation) {
      return toast({
        title: "Geolocation not supported",
        description: "Please enable location services",
        variant: "destructive",
      });
    }
    toast({ title: "Getting your location..." });
    getInitialLocation();
  };

  const getInitialLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        const position = { lat: latitude, lng: longitude };
        setCurrentPosition(position);
        setAccuracy(accuracy);
        setLocationHistory([position]);
        setInitialFixDone(true);
        socket.emit("send-location", {
          sessionId,
          latitude,
          longitude,
          timestamp: Date.now(),
        });
        toast({ title: "Initial location acquired." });

        // ✅ FIX: Start sharing here only once
        if (!hasStartedSharingRef.current) {
          hasStartedSharingRef.current = true;
          setIsSharing(true);
          setViewers(Math.floor(Math.random() * 3) + 1);
          toast({ title: "Live l sharing started." });
        }

        startWatchLocation();
      },
      (err) =>
        toast({
          title: "Location Error",
          description: err.message,
          variant: "destructive",
        }),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const startWatchLocation = () => {
    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        const position = { lat: latitude, lng: longitude };
        setCurrentPosition(position);
        setAccuracy(accuracy);
        setLocationHistory((prev) => [...prev, position]);
        socket.emit("send-location", {
          sessionId,
          latitude,
          longitude,
          timestamp: Date.now(),
        });

        // ✅ FIX: Removed repeated toast from here
      },
      (err) =>
        toast({
          title: "Tracking Error",
          description: err.message,
          variant: "destructive",
        }),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
    );
  };

  const pauseLocationSharing = () => {
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setIsPaused(true);
    socket.emit("pause-location", { sessionId });
    toast({ title: "Paused", description: "Location sharing paused" });
  };

  const resumeLocationSharing = () => {
    setIsPaused(false);
    startWatchLocation();
    toast({ title: "Resumed", description: "Location sharing resumed" });
  };

  const stopLocationSharing = () => {
    if (watchIdRef.current)
      navigator.geolocation.clearWatch(watchIdRef.current);
    socket.emit("terminate-location", { sessionId });
    setIsSharing(false);
    setIsPaused(false);
    setDuration(0);
    setLocationHistory([]);
    setCurrentPosition(null);
    setInitialFixDone(false);
    hasStartedSharingRef.current = false; // ✅ Reset flag
    toast({ title: "Stopped", description: "Location sharing stopped" });

    navigate("/");
  };

  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(
      2,
      "0"
    )}`;
  const formatAccuracy = (acc) =>
    acc < 1000 ? `${Math.round(acc)}m` : `${(acc / 1000).toFixed(1)}km`;

  if (!isLoaded)
    return <div className="text-center p-10">Loading Google Map...</div>;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 py-4 px-4">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold text-center mb-4">
            Emergency Location Sharing
          </h1>
          <div className="text-center mb-4 text-muted-foreground">
            Session: <Badge variant="outline">{sessionId}</Badge>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <Card>
                <CardContent className="p-0">
                  <div className="h-96 md:h-[500px] overflow-hidden rounded-lg">
                    <GoogleMap
                      mapContainerStyle={containerStyle}
                      center={currentPosition || defaultCenter}
                      zoom={16}
                      ref={mapRef}
                    >
                      {currentPosition && <Marker position={currentPosition} />}
                      {locationHistory.length > 1 && (
                        <Polyline
                          path={locationHistory}
                          options={{ strokeColor: "#34a853", strokeWeight: 4 }}
                        />
                      )}
                    </GoogleMap>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-4">
                <CardContent className="p-4 text-center flex gap-4 justify-center flex-wrap">
                  {!isSharing && !initialFixDone ? (
                    <Button
                      onClick={startLocationSharing}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      <Navigation className="mr-2" /> Start Sharing
                    </Button>
                  ) : (
                    <>
                      {isPaused ? (
                        <Button onClick={resumeLocationSharing}>
                          <Play className="mr-2" /> Resume
                        </Button>
                      ) : (
                        <Button
                          onClick={pauseLocationSharing}
                          variant="outline"
                        >
                          <Square className="mr-2" /> Pause
                        </Button>
                      )}
                      <Button
                        onClick={stopLocationSharing}
                        variant="destructive"
                      >
                        <Trash2 className="mr-2" /> Stop
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardContent className="text-center p-4">
                  <Clock className="mx-auto mb-2" />
                  <div className="text-2xl font-bold">
                    {formatTime(duration)}
                  </div>
                  <p>Duration</p>
                </CardContent>
              </Card>
              {currentPosition && (
                <Card>
                  <CardHeader>
                    <CardTitle>Location Info</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Lat: {currentPosition.lat.toFixed(6)}</p>
                    <p>Lng: {currentPosition.lng.toFixed(6)}</p>
                    <p>Accuracy: {formatAccuracy(accuracy)}</p>
                    <p>Points: {locationHistory.length}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StartLocationSharing;
