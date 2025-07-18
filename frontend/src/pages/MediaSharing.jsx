// import React, { useState, useRef, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Camera, Mic, MicOff, VideoOff, Square, Play, Pause } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useToast } from "@/hooks/use-toast";
// import socket from "@/socket/socket";

// const MediaSharing = () => {
//   const { sessionId } = useParams();
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   const videoRef = useRef(null);
//   const localStreamRef = useRef(null);
//   const peerConnections = useRef({});

//   const [isStreaming, setIsStreaming] = useState(false);
//   const [isPaused, setIsPaused] = useState(false);
//   const [isAudioEnabled, setIsAudioEnabled] = useState(true);
//   const [isVideoEnabled, setIsVideoEnabled] = useState(true);

//   useEffect(() => {
//     socket.emit("join-room", { sessionId, role: "sender" });

//     socket.on("new-viewer", async ({ viewerId }) => {
//       if (!localStreamRef.current) return;
//       const pc = createPeerConnection(viewerId);
//       peerConnections.current[viewerId] = pc;
//       const offer = await pc.createOffer();
//       await pc.setLocalDescription(offer);
//       socket.emit("offer", { sessionId, viewerId, offer });
//     });

//     socket.on("answer", async ({ viewerId, answer }) => {
//       const pc = peerConnections.current[viewerId];
//       if (pc) {
//         await pc.setRemoteDescription(new RTCSessionDescription(answer));
//       }
//     });

//     socket.on("candidate", async ({ viewerId, candidate }) => {
//       const pc = peerConnections.current[viewerId];
//       if (pc && candidate) {
//         await pc.addIceCandidate(new RTCIceCandidate(candidate));
//       }
//     });

//     socket.on("sender-disconnected", () => {
//       stopStreaming();
//     });

//     return () => {
//       Object.values(peerConnections.current).forEach((pc) => pc.close());
//       socket.emit("end-call", { sessionId });
//       socket.off("new-viewer");
//       socket.off("answer");
//       socket.off("candidate");
//       socket.off("sender-disconnected");
//     };
//   }, [sessionId]);

//   const createPeerConnection = (viewerId) => {
//     const pc = new RTCPeerConnection({
//       iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//     });
//     localStreamRef.current.getTracks().forEach((track) =>
//       pc.addTrack(track, localStreamRef.current)
//     );
//     pc.onicecandidate = (event) => {
//       if (event.candidate) {
//         socket.emit("candidate", {
//           sessionId,
//           targetId: viewerId,
//           candidate: event.candidate,
//         });
//       }
//     };
//     return pc;
//   };

//   const startStreaming = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true,
//       });
//       videoRef.current.srcObject = stream;
//       localStreamRef.current = stream;
//       setIsStreaming(true);
//       setIsPaused(false);
//       toast({ title: "Streaming started" });
//     } catch (err) {
//       toast({
//         title: "Stream Error",
//         description: err.message,
//         variant: "destructive",
//       });
//     }
//   };

//   const pauseStreaming = () => {
//     if (!localStreamRef.current) return;
//     localStreamRef.current.getTracks().forEach((track) => (track.enabled = false));
//     setIsPaused(true);
//     toast({ title: "Streaming paused" });
//   };

//   const resumeStreaming = () => {
//     if (!localStreamRef.current) return;
//     localStreamRef.current.getTracks().forEach((track) => {
//       track.enabled = true;
//     });
//     setIsPaused(false);
//     toast({ title: "Streaming resumed" });
//   };

//   const stopStreaming = () => {
//     localStreamRef.current?.getTracks().forEach((track) => track.stop());
//     Object.values(peerConnections.current).forEach((pc) => pc.close());
//     peerConnections.current = {};
//     videoRef.current.srcObject = null;
//     setIsStreaming(false);
//     setIsPaused(false);
//     toast({ title: "Streaming stopped" });
//     socket.emit("end-call", { sessionId });
//     navigate("/");
//   };

//   const toggleAudio = () => {
//     const tracks = localStreamRef.current?.getAudioTracks() || [];
//     tracks.forEach((t) => (t.enabled = !t.enabled));
//     setIsAudioEnabled((prev) => !prev);
//   };

//   const toggleVideo = () => {
//     const tracks = localStreamRef.current?.getVideoTracks() || [];
//     tracks.forEach((t) => (t.enabled = !t.enabled));
//     setIsVideoEnabled((prev) => !prev);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-background">
//       <Card className="w-full max-w-4xl">
//         <CardHeader>
//           <CardTitle className="text-xl">Emergency Media Sharing</CardTitle>
//         </CardHeader>
//         <CardContent className="relative">
//           <div className="aspect-video bg-black rounded-lg overflow-hidden">
//             <video
//               ref={videoRef}
//               autoPlay
//               playsInline
//               muted
//               className="w-full h-full object-cover"
//             />
//           </div>

//           <div className="mt-4 flex gap-3 justify-center flex-wrap">
//             {!isStreaming ? (
//               <Button onClick={startStreaming} className="bg-red-600 hover:bg-red-700">
//                 <Camera className="mr-2 h-4 w-4" />
//                 Start Stream
//               </Button>
//             ) : (
//               <>
//                 {!isPaused ? (
//                   <Button onClick={pauseStreaming} variant="outline">
//                     <Pause className="mr-2 h-4 w-4" />
//                     Pause Stream
//                   </Button>
//                 ) : (
//                   <Button onClick={resumeStreaming} variant="outline">
//                     <Play className="mr-2 h-4 w-4" />
//                     Resume Stream
//                   </Button>
//                 )}

//                 <Button variant="outline" onClick={toggleAudio}>
//                   {isAudioEnabled ? (
//                     <>
//                       <Mic className="mr-2 h-4 w-4" /> Mute
//                     </>
//                   ) : (
//                     <>
//                       <MicOff className="mr-2 h-4 w-4" /> Unmute
//                     </>
//                   )}
//                 </Button>

//                 <Button variant="outline" onClick={toggleVideo}>
//                   <VideoOff className="mr-2 h-4 w-4" />
//                   {isVideoEnabled ? "Hide Video" : "Show Video"}
//                 </Button>

//                 <Button variant="destructive" onClick={stopStreaming}>
//                   <Square className="mr-2 h-4 w-4" />
//                   Stop Stream
//                 </Button>
//               </>
//             )}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default MediaSharing;
import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Camera, Mic, MicOff, VideoOff, Square, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import socket from "@/socket/socket";

const MediaSharing = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const videoRef = useRef(null);
  const localStreamRef = useRef(null);
  const peerConnections = useRef({});

  const [isStreaming, setIsStreaming] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [cameras, setCameras] = useState([]);
  const [selectedCameraId, setSelectedCameraId] = useState("");

  // 1. On mount: Get all video devices after permission
  useEffect(() => {
    async function fetchCameras() {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter((d) => d.kind === "videoinput");
        setCameras(videoDevices);
        if (videoDevices.length && !selectedCameraId) {
          setSelectedCameraId(videoDevices[0].deviceId);
        }
      } catch (err) {
        toast({
          title: "Camera Permission Required",
          description: err.message,
          variant: "destructive",
        });
      }
    }
    fetchCameras();
    // eslint-disable-next-line
  }, []);

  // 2. WebRTC signaling and cleanup
  useEffect(() => {
    socket.emit("join-room", { sessionId, role: "sender" });

    socket.on("new-viewer", async ({ viewerId }) => {
      if (!localStreamRef.current) return;
      const pc = createPeerConnection(viewerId);
      peerConnections.current[viewerId] = pc;
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      socket.emit("offer", { sessionId, viewerId, offer });
    });

    socket.on("answer", async ({ viewerId, answer }) => {
      const pc = peerConnections.current[viewerId];
      if (pc) {
        await pc.setRemoteDescription(new window.RTCSessionDescription(answer));
      }
    });

    socket.on("candidate", async ({ viewerId, candidate }) => {
      const pc = peerConnections.current[viewerId];
      if (pc && candidate) {
        await pc.addIceCandidate(new RTCIceCandidate(candidate));
      }
    });

    socket.on("sender-disconnected", () => {
      stopStreaming();
    });

    return () => {
      Object.values(peerConnections.current).forEach((pc) => pc.close());
      peerConnections.current = {};
      socket.emit("end-call", { sessionId });
      socket.off("new-viewer");
      socket.off("answer");
      socket.off("candidate");
      socket.off("sender-disconnected");
    };
    // eslint-disable-next-line
  }, [sessionId]);

  // ---- Peer connections helpers ----

  // Replace tracks for seamless switching in all existing peer connections
  const replaceTracks = (newStream) => {
    Object.values(peerConnections.current).forEach((pc) => {
      newStream.getTracks().forEach((track) => {
        const sender = pc.getSenders().find((s) => s.track && s.track.kind === track.kind);
        if (sender) {
          sender.replaceTrack(track);
        } else {
          pc.addTrack(track, newStream);
        }
      });
    });
  };

  // Renegotiate after stream change for best compatibility
  const renegotiateAll = async () => {
    for (const [viewerId, pc] of Object.entries(peerConnections.current)) {
      try {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        socket.emit("offer", { sessionId, viewerId, offer });
      } catch (e) {
        console.error("Renegotiation error:", e);
      }
    }
  };

  // Peer connection creation
  const createPeerConnection = (viewerId) => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });
    // Add tracks from the current stream if present
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) =>
        pc.addTrack(track, localStreamRef.current)
      );
    }
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("candidate", {
          sessionId,
          targetId: viewerId,
          candidate: event.candidate,
        });
      }
    };
    return pc;
  };

  // ---- Main controls ----

  // Start streaming with the selected camera (or default one)
  const startStreaming = async (cameraId = selectedCameraId) => {
    try {
      if (!cameraId && cameras.length) cameraId = cameras[0].deviceId;
      // Stop previous stream
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((t) => t.stop());
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: cameraId ? { exact: cameraId } : undefined },
        audio: true,
      });
      videoRef.current.srcObject = stream;
      localStreamRef.current = stream;
      // Sync new tracks to all viewers
      replaceTracks(stream);
      await renegotiateAll();

      setIsStreaming(true);
      setIsPaused(false);
      setIsAudioEnabled(true);
      setIsVideoEnabled(true);
      toast({ title: "Streaming started" });
    } catch (err) {
      toast({
        title: "Stream Error",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  // Camera drop-down change
  const handleCameraChange = async (e) => {
    const newCameraId = e.target.value;
    setSelectedCameraId(newCameraId);
    if (isStreaming) {
      await startStreaming(newCameraId);
    }
  };

  const pauseStreaming = () => {
    if (!localStreamRef.current) return;
    localStreamRef.current.getTracks().forEach((track) => (track.enabled = false));
    setIsPaused(true);
    toast({ title: "Streaming paused" });
  };

  const resumeStreaming = () => {
    if (!localStreamRef.current) return;
    localStreamRef.current.getTracks().forEach((track) => (track.enabled = true));
    setIsPaused(false);
    toast({ title: "Streaming resumed" });
  };

  const stopStreaming = () => {
    localStreamRef.current?.getTracks().forEach((track) => track.stop());
    Object.values(peerConnections.current).forEach((pc) => pc.close());
    peerConnections.current = {};
    videoRef.current.srcObject = null;
    setIsStreaming(false);
    setIsPaused(false);
    toast({ title: "Streaming stopped" });
    socket.emit("end-call", { sessionId });
    navigate("/");
  };

  const toggleAudio = () => {
    const tracks = localStreamRef.current?.getAudioTracks() || [];
    tracks.forEach((t) => (t.enabled = !t.enabled));
    setIsAudioEnabled((prev) => !prev);
  };

  const toggleVideo = () => {
    const tracks = localStreamRef.current?.getVideoTracks() || [];
    tracks.forEach((t) => (t.enabled = !t.enabled));
    setIsVideoEnabled((prev) => !prev);
  };

  // ---- Render ----

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-xl">Emergency Media Sharing</CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="aspect-video bg-black rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          </div>

          {/* Camera selector if >1 camera */}
          <div className="mt-4 flex justify-center">
            {cameras.length > 1 && (
              <select
                className="border p-2 rounded-lg bg-background shadow"
                value={selectedCameraId}
                onChange={handleCameraChange}
                disabled={!cameras.length}
              >
                {cameras.map(({ deviceId, label }, i) => (
                  <option key={deviceId} value={deviceId}>
                    {label || `Camera ${i + 1}`}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="mt-4 flex gap-3 justify-center flex-wrap">
            {!isStreaming ? (
              <Button
                onClick={() => startStreaming(selectedCameraId)}
                className="bg-red-600 hover:bg-red-700"
                disabled={!selectedCameraId}
              >
                <Camera className="mr-2 h-4 w-4" />
                Start Stream
              </Button>
            ) : (
              <>
                {!isPaused ? (
                  <Button onClick={pauseStreaming} variant="outline">
                    <Pause className="mr-2 h-4 w-4" />
                    Pause Stream
                  </Button>
                ) : (
                  <Button onClick={resumeStreaming} variant="outline">
                    <Play className="mr-2 h-4 w-4" />
                    Resume Stream
                  </Button>
                )}
                <Button variant="outline" onClick={toggleAudio}>
                  {isAudioEnabled ? (
                    <>
                      <Mic className="mr-2 h-4 w-4" /> Mute
                    </>
                  ) : (
                    <>
                      <MicOff className="mr-2 h-4 w-4" /> Unmute
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={toggleVideo}>
                  <VideoOff className="mr-2 h-4 w-4" />
                  {isVideoEnabled ? "Hide Video" : "Show Video"}
                </Button>
                <Button variant="destructive" onClick={stopStreaming}>
                  <Square className="mr-2 h-4 w-4" />
                  Stop Stream
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MediaSharing;
