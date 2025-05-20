
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';
import NeonButton from './NeonButton';
import { useToast } from '@/hooks/use-toast';

const AudioPlayer = () => {
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Lista de músicas para reproduzir
  const playlists = [
    {
      name: "Música Futurista",
      url: "https://storage.googleapis.com/aura-breeze-405411.appspot.com/music/royalty-free-electronic-music.mp3"
    }
  ];

  // Initialize audio on component mount
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(playlists[0].url);
      audioRef.current.loop = true;
      audioRef.current.volume = volume;
      
      // Evento para detectar quando o áudio estiver carregado
      audioRef.current.addEventListener('canplaythrough', () => {
        setIsLoaded(true);
      });
      
      // Evento para detectar erros de carregamento
      audioRef.current.addEventListener('error', (e) => {
        console.error("Erro ao carregar áudio:", e);
        toast({
          title: "Erro ao carregar música",
          description: "Não foi possível reproduzir a música. Tente novamente mais tarde.",
          variant: "destructive"
        });
      });
    }
    
    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('canplaythrough', () => {});
        audioRef.current.removeEventListener('error', () => {});
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current || !isLoaded) {
      toast({
        title: "Aguarde",
        description: "A música está carregando...",
      });
      return;
    }
    
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Some browsers require user interaction before playing audio
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              toast({
                title: "Música iniciada",
                description: "Aproveite a trilha sonora espacial!",
              });
            })
            .catch(error => {
              console.error("Audio play failed:", error);
              toast({
                title: "Erro ao reproduzir",
                description: "Não foi possível iniciar a música. Tente novamente.",
                variant: "destructive"
              });
            });
        }
      }
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
