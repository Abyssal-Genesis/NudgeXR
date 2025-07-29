import React, { useState, useEffect } from 'react';
import { Video, Mic, MicOff, Users, Settings, Maximize } from 'lucide-react';
import Avatar from './Avatar';
import MeetingRoom from './MeetingRoom';
import VoiceControls from './VoiceControls';

interface VRInterfaceProps {
  currentDeal: any;
  setCurrentDeal: (deal: any) => void;
}

const VRInterface: React.FC<VRInterfaceProps> = ({ currentDeal, setCurrentDeal }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVRMode, setIsVRMode] = useState(false);
  const [participants, setParticipants] = useState([
    { id: 1, name: 'John Sales Agent', role: 'agent', avatar: 'agent-1' },
    { id: 2, name: 'Sarah Client', role: 'client', avatar: 'client-1' },
  ]);

  const [currentRoom, setCurrentRoom] = useState('modern-office');

  const rooms = [
    { id: 'modern-office', name: 'Modern Office', theme: 'professional' },
    { id: 'luxury-suite', name: 'Luxury Suite', theme: 'premium' },
    { id: 'creative-space', name: 'Creative Space', theme: 'innovative' },
    { id: 'nature-retreat', name: 'Nature Retreat', theme: 'relaxed' },
  ];

  return (
    <div className="h-screen relative overflow-hidden">
      {/* Main VR Viewport */}
      <div className={`relative h-full transition-all duration-500 ${isVRMode ? 'rounded-3xl m-4' : ''}`}>
        <MeetingRoom room={currentRoom} isVRMode={isVRMode} />
        
        {/* Participants */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-4">
          {participants.map((participant) => (
            <Avatar
              key={participant.id}
              name={participant.name}
              role={participant.role}
              avatar={participant.avatar}
              isActive={true}
            />
          ))}
        </div>

        {/* VR Controls */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <div className="bg-black/40 backdrop-blur-lg rounded-full px-6 py-3 flex items-center space-x-4">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-3 rounded-full transition-all ${
                isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              {isMuted ? <MicOff className="w-5 h-5 text-white" /> : <Mic className="w-5 h-5 text-white" />}
            </button>
            
            <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-all">
              <Video className="w-5 h-5 text-white" />
            </button>
            
            <button
              onClick={() => setIsVRMode(!isVRMode)}
              className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 transition-all"
            >
              <Maximize className="w-5 h-5 text-white" />
            </button>
            
            <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-all">
              <Settings className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Room Selector */}
        <div className="absolute top-6 left-6">
          <div className="bg-black/40 backdrop-blur-lg rounded-lg p-4">
            <h3 className="text-white font-semibold mb-3">Meeting Room</h3>
            <div className="grid grid-cols-2 gap-2">
              {rooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => setCurrentRoom(room.id)}
                  className={`p-3 rounded-lg text-sm transition-all ${
                    currentRoom === room.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {room.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Deal Info Panel */}
        {currentDeal && (
          <div className="absolute top-6 right-6">
            <div className="bg-black/40 backdrop-blur-lg rounded-lg p-4 max-w-sm">
              <h3 className="text-white font-semibold mb-2">Current Deal</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Client:</span>
                  <span className="text-white">{currentDeal.clientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Value:</span>
                  <span className="text-green-400">${currentDeal.value?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Stage:</span>
                  <span className="text-blue-400">{currentDeal.stage}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Voice Controls */}
      <VoiceControls isMuted={isMuted} />
    </div>
  );
};

export default VRInterface;