import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Mic } from 'lucide-react';

interface VoiceControlsProps {
  isMuted: boolean;
}

const VoiceControls: React.FC<VoiceControlsProps> = ({ isMuted }) => {
  const [isListening, setIsListening] = useState(false);
  const [speechText, setSpeechText] = useState('');
  const [audioLevel, setAudioLevel] = useState(0);

  // Simulate voice activity
  useEffect(() => {
    if (!isMuted) {
      const interval = setInterval(() => {
        setAudioLevel(Math.random() * 100);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isMuted]);

  const startListening = () => {
    setIsListening(true);
    // Simulate speech recognition
    setTimeout(() => {
      setSpeechText("Let me show you our premium package benefits...");
      setTimeout(() => {
        setSpeechText('');
        setIsListening(false);
      }, 3000);
    }, 1000);
  };

  return (
    <div className="absolute bottom-32 left-6">
      <div className="bg-black/40 backdrop-blur-lg rounded-lg p-4 space-y-4">
        <h3 className="text-white font-semibold">Voice Controls</h3>
        
        {/* Audio Level Indicator */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Volume2 className="w-4 h-4 text-gray-300" />
            <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all duration-100"
                style={{ width: `${isMuted ? 0 : audioLevel}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Voice Commands */}
        <div className="space-y-2">
          <button
            onClick={startListening}
            disabled={isMuted}
            className={`w-full p-3 rounded-lg flex items-center justify-center space-x-2 transition-all ${
              isListening
                ? 'bg-red-600 animate-pulse'
                : isMuted
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            <Mic className="w-4 h-4 text-white" />
            <span className="text-white text-sm">
              {isListening ? 'Listening...' : 'Push to Talk'}
            </span>
          </button>
        </div>

        {/* Speech Text Display */}
        {speechText && (
          <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-3">
            <p className="text-blue-100 text-sm">{speechText}</p>
          </div>
        )}

        {/* Voice Commands Help */}
        <div className="text-xs text-gray-400 space-y-1">
          <p>Voice Commands:</p>
          <ul className="space-y-1 pl-2">
            <li>"Show proposal"</li>
            <li>"Switch to premium"</li>
            <li>"Generate contract"</li>
            <li>"Schedule follow-up"</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VoiceControls;