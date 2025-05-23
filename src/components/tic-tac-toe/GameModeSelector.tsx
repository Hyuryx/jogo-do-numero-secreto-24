
import React from 'react';
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { User, Bot } from 'lucide-react';
import { GameMode } from './types';

interface GameModeSelectorProps {
  gameMode: GameMode;
  onModeChange: (mode: GameMode) => void;
}

const GameModeSelector: React.FC<GameModeSelectorProps> = ({ gameMode, onModeChange }) => {
  return (
    <RadioGroup 
      defaultValue={gameMode} 
      className="flex space-x-4 mb-4"
      onValueChange={(value) => onModeChange(value as GameMode)}
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="player" id="player" />
        <Label htmlFor="player" className="flex items-center gap-1">
          <User className="h-4 w-4" /> vs <User className="h-4 w-4" />
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="ai" id="ai" />
        <Label htmlFor="ai" className="flex items-center gap-1">
          <User className="h-4 w-4" /> vs <Bot className="h-4 w-4" />
        </Label>
      </div>
    </RadioGroup>
  );
};

export default GameModeSelector;
