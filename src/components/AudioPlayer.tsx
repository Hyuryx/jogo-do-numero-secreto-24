
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';
import NeonButton from './NeonButton';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio on component mount
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/background-music.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = volume;
    }
    
    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Some browsers require user interaction before playing audio
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Audio play failed:", error);
          });
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="flex items-center gap-2">
      <NeonButton 
        onClick={togglePlay} 
        className="flex items-center gap-2"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        <span>{isPlaying ? "Pausar Música" : "Tocar Música"}</span>
      </NeonButton>
      
      <div className="relative hidden md:flex items-center gap-2 bg-space-darker/60 rounded-full px-3 py-1 border border-neon-blue/20">
        <Volume2 size={16} className="text-neon-blue" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-20 h-2 bg-space-light rounded-lg appearance-none cursor-pointer"
          aria-label="Volume"
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
