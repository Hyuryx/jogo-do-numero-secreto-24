
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import NeonButton from "./NeonButton";

const PlayerNameModal = () => {
  const [open, setOpen] = useState(false);
  const [playerName, setPlayerName] = useState('');
  
  useEffect(() => {
    // Check if player name exists in localStorage
    const storedName = localStorage.getItem('playerName');
    if (!storedName) {
      setOpen(true);
    }
  }, []);
  
  const handleSaveName = () => {
    if (playerName.trim()) {
      localStorage.setItem('playerName', playerName.trim());
      setOpen(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-space-darker border-neon-blue/30">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            <span className="text-gradient">Bem-vindo ao Jogo</span>
          </DialogTitle>
          <DialogDescription className="text-center text-gray-300">
            Como você gostaria de ser chamado no ranking?
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <Input
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Seu nome ou apelido"
            className="bg-space-accent/50 text-white border-neon-purple/30"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSaveName();
              }
            }}
          />
        </div>
        
        <DialogFooter>
          <NeonButton onClick={handleSaveName} className="w-full">
            Começar a Jogar
          </NeonButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PlayerNameModal;
