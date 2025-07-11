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
        await pc.setRemoteDescription(new RTCSessionDescription(answer));
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
      socket.emit("end-call", { sessionId });
      socket.off("new-viewer");
      socket.off("answer");
      socket.off("candidate");
      socket.off("sender-disconnected");
    };
  }, [sessionId]);

  const createPeerConnection = (viewerId) => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });
    localStreamRef.current.getTracks().forEach((track) =>
      pc.addTrack(track, localStreamRef.current)
    );
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

  const startStreaming = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      videoRef.current.srcObject = stream;
      localStreamRef.current = stream;
      setIsStreaming(true);
      setIsPaused(false);
      toast({ title: "Streaming started" });
    } catch (err) {
      toast({
        title: "Stream Error",
        description: err.message,
        variant: "destructive",
      });
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
    localStreamRef.current.getTracks().forEach((track) => {
      track.enabled = true;
    });
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

          <div className="mt-4 flex gap-3 justify-center flex-wrap">
            {!isStreaming ? (
              <Button onClick={startStreaming} className="bg-red-600 hover:bg-red-700">
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
