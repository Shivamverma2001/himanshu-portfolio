'use client';

import { useEffect, useRef, useState } from 'react';
import { create } from 'zustand';

// Global state for background music control
interface MusicStore {
  isVideoPlaying: boolean;
  setIsVideoPlaying: (playing: boolean) => void;
}

export const useMusicStore = create<MusicStore>((set) => ({
  isVideoPlaying: false,
  setIsVideoPlaying: (playing: boolean) => set({ isVideoPlaying: playing }),
}));

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const { isVideoPlaying } = useMusicStore();

  useEffect(() => {
    // Create audio element
    const audio = new Audio('/music/mymusic.webm');
    audio.loop = true;
    audio.volume = 0.3; // 30% volume
    audio.preload = 'auto';
    
    // Load the audio
    audio.load();
    
    audioRef.current = audio;

    // Try to start playing after first user interaction
    const handleUserInteraction = () => {
      if (!hasStarted && audio.paused) {
        audio.play().then(() => {
          setHasStarted(true);
          console.log('🎵 Background music started');
        }).catch((error) => {
          console.error('❌ Could not start background music:', error);
        });
      }
    };

    // Listen for any user interaction
    const events = ['click', 'touchstart', 'keydown', 'scroll'];
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true });
    });

    // Cleanup
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
      audio.pause();
      audio.src = '';
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!audioRef.current || !hasStarted) return;

    // Pause music when video is playing
    if (isVideoPlaying) {
      audioRef.current.pause();
      console.log('⏸️  Background music paused');
    } else {
      // Resume music when video stops
      audioRef.current.play().then(() => {
        console.log('▶️  Background music resumed');
      }).catch((error) => {
        console.error('Could not resume background music:', error);
      });
    }
  }, [isVideoPlaying, hasStarted]);

  // This component doesn't render anything
  return null;
}

