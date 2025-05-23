
import React from 'react';

interface QuizTimerProps {
  timeLeft: number;
  totalTime: number;
}

const QuizTimer: React.FC<QuizTimerProps> = ({ timeLeft, totalTime }) => {
  return (
    <>
      {/* Timer Bar */}
      <div className="w-full h-2 bg-space-light/30 rounded-full overflow-hidden">
        <div 
          className="h-full bg-neon-blue"
          style={{ 
            width: `${(timeLeft / totalTime) * 100}%`, 
            transition: 'width 1s linear' 
          }}
        ></div>
      </div>
      <p className="text-right text-gray-300 light:text-gray-700 text-sm">
        Tempo: {timeLeft}s
      </p>
    </>
  );
};

export default QuizTimer;
