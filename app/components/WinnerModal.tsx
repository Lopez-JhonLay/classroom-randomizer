"use client";

import { useEffect, useRef } from "react";

import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

interface WinnerModalProps {
  name: string;
  avatar: string;
  isVisible: boolean;
  onClose: () => void;
}

function WinnerModal({ name, avatar, isVisible, onClose }: WinnerModalProps) {
  const { width, height } = useWindowSize();
  const audioRef2 = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isVisible && audioRef2.current) {
      audioRef2.current.volume = 0.3;
      // Try to play the audio
      const playPromise = audioRef2.current.play();

      // Handle autoplay restrictions
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Sound played successfully");
          })
          .catch((error: unknown) => {
            console.log("Autoplay prevented. User interaction required.", error);
          });
      }
    }
  }, [isVisible]);

  if (!isVisible) return null;

  const skinColor = "#F5D0B0";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <audio ref={audioRef2} src="/sounds/mixkit-cheering-crowd-loud-whistle-610.wav" preload="auto" />
      <Confetti width={width} height={height} recycle={true} numberOfPieces={300} />
      <div className="flex flex-col items-center animate-winner-zoom" onClick={(e) => e.stopPropagation()}>
        {/* Student figure - enlarged */}
        <div className="relative flex flex-col items-center">
          <img
            src={avatar}
            alt={name}
            className="w-[280px] h-[280px] rounded-full border-8 border-white shadow-2xl object-cover z-10"
          />
          <svg width="400" height="200" viewBox="-5 0 110 55" className="-mt-12 z-20" style={{ overflow: "visible" }}>
            {/* Left arm */}
            <ellipse cx="12" cy="28" rx="8" ry="18" fill={skinColor} transform="rotate(-15 12 28)" />
            {/* Right arm raised */}
            <ellipse cx="95" cy="5" rx="7" ry="16" fill={skinColor} transform="rotate(-10 95 5)" />
            <ellipse cx="100" cy="-15" rx="6" ry="14" fill={skinColor} transform="rotate(5 100 -15)" />
            <ellipse cx="102" cy="-32" rx="7" ry="6" fill={skinColor} />
            <ellipse cx="96" cy="-38" rx="2" ry="5" fill={skinColor} />
            <ellipse cx="100" cy="-40" rx="2" ry="6" fill={skinColor} />
            <ellipse cx="104" cy="-40" rx="2" ry="6" fill={skinColor} />
            <ellipse cx="108" cy="-38" rx="2" ry="5" fill={skinColor} />
            <ellipse cx="93" cy="-32" rx="2" ry="4" fill={skinColor} transform="rotate(-30 93 -32)" />
            {/* Torso */}
            <path
              d="M 20 5 Q 10 15 15 45 Q 20 55 50 55 Q 80 55 85 45 Q 90 15 80 5 Q 65 10 50 10 Q 35 10 20 5 Z"
              fill="white"
              stroke="#E5E7EB"
              strokeWidth="1"
            />
            <path d="M 38 5 L 32 20 L 42 18 Z" fill="white" stroke="#E5E7EB" strokeWidth="1" />
            <path d="M 62 5 L 68 20 L 58 18 Z" fill="white" stroke="#E5E7EB" strokeWidth="1" />
            <line x1="50" y1="18" x2="50" y2="50" stroke="#E5E7EB" strokeWidth="1" />
            <circle cx="50" cy="25" r="2" fill="#1F2937" />
            <circle cx="50" cy="35" r="2" fill="#1F2937" />
            <circle cx="50" cy="45" r="2" fill="#1F2937" />
          </svg>
        </div>

        {/* Winner name */}
        <div className="mt-6 px-10 py-4 bg-teal-400 rounded-full text-white text-3xl font-bold shadow-lg">
          🎉 {name} 🎉
        </div>

        <p className="mt-6 text-white text-xl">Click anywhere to close</p>
      </div>
    </div>
  );
}

export default WinnerModal;
