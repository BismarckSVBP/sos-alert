import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Shield,
  Users,
  Clock,
  Volume2,
  VolumeX,
  Maximize,
  AlertTriangle,
  Play,
  Pause,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import socket from "@/socket/socket";

const MediaWatching = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const videoRef = useRef(null);
  const pcRef = useRef(null);
  const remoteStream = useRef(new MediaStream());

  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [viewers, setViewers] = useState(1);
  const [duration, setDuration] = useState(0);
  const [streamActive, setStreamActive] = useState(true);

  useEffect(() => {
    // Prevent re-entering if session was ended
    if (sessionStorage.getItem(`ended-${sessionId}`)) {
      navigate("/");
      return;
    }

    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });
    pcRef.current = pc;

    pc.ontrack = (event) => {
      event.streams[0]?.getTracks().forEach((t) => remoteStream.current.addTrack(t));
      if (videoRef.current) {
        videoRef.current.srcObject = remoteStream.current;
        videoRef.current.muted = true; // Needed for autoplay policy
        videoRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.warn("Autoplay failed:", err));
      }
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("candidate", {
          sessionId,
          targetId: null,
          candidate: event.candidate,
        });
      }
    };

    socket.emit("join-room", { sessionId, role: "viewer" });

    socket.on("offer", async ({ offer, senderId }) => {
      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socket.emit("answer", { sessionId, viewerId: socket.id, answer, senderId });
    });

    socket.on("candidate", async ({ candidate }) => {
      if (candidate) {
        await pc.addIceCandidate(new RTCIceCandidate(candidate));
      }
    });

    socket.on("end-call", () => {
      pc.close();
      setStreamActive(false);
      sessionStorage.setItem(`ended-${sessionId}`, "true"); // Prevent reload access
      toast({
        title: "Stream Ended",
        description: "The emergency broadcast has concluded.",
      });
      navigate("/"); // Redirect to homepage
    });

    const interval = setInterval(() => {
      setDuration((d) => d + 1);
      setViewers((v) => Math.max(1, v + Math.floor(Math.random() * 2) - 1));
    }, 1000);

    return () => {
      clearInterval(interval);
      pc.close();
      socket.off("offer");
      socket.off("candidate");
      socket.off("end-call");
    };
  }, [sessionId, navigate]);

  const toggleMute = () => {
    setIsMuted((prev) => {
      if (videoRef.current) videoRef.current.muted = !prev;
      return !prev;
    });
  };

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch((err) => console.error("Playback error:", err));
    }
    setIsPlaying((prev) => !prev);
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const formatTime = (sec) =>
    `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="py-8 px-4 flex-grow">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            
            
            <div className="flex justify-center items-center text-muted-foreground gap-2">
              <span>Session:</span>
              <Badge variant="outline">{sessionId}</Badge>
            </div>
          </div>

          {streamActive ? (
            <>
              <Card className="mb-4">
                <CardContent className="relative p-0">
                  <div className="aspect-video bg-black rounded-lg overflow-hidden">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted={isMuted}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 right-4 flex gap-2">
                      <Button
                        onClick={togglePlay}
                        variant="secondary"
                        className="bg-black/50 text-white border-0"
                      >
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <Button
                        onClick={toggleMute}
                        variant="secondary"
                        className="bg-black/50 text-white border-0"
                      >
                        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      </Button>
                      <Button
                        onClick={toggleFullscreen}
                        variant="secondary"
                        className="bg-black/50 text-white border-0"
                      >
                        <Maximize className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 mb-4">
              
                <Card>
                  <CardContent className="p-4 text-center">
                    <Clock className="mx-auto mb-2" />
                    <div className="text-lg font-bold">{formatTime(duration)}</div>
                    <p className="text-sm">Duration</p>
                  </CardContent>
                </Card>
              </div>
            </>
          ) : (
            <Card className="text-center p-8">
              <AlertTriangle className="mx-auto mb-4 h-12 w-12 text-red-500" />
              <h2 className="text-lg font-bold">Stream Ended</h2>
              <p className="text-muted-foreground">The emergency broadcast has concluded.</p>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default MediaWatching;
