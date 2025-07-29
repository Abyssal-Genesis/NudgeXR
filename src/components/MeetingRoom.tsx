import React from 'react';

interface MeetingRoomProps {
  room: string;
  isVRMode: boolean;
}

const MeetingRoom: React.FC<MeetingRoomProps> = ({ room, isVRMode }) => {
  const roomStyles = {
    'modern-office': 'from-slate-800 via-slate-700 to-slate-900',
    'luxury-suite': 'from-amber-900 via-yellow-800 to-amber-900',
    'creative-space': 'from-purple-800 via-pink-700 to-purple-900',
    'nature-retreat': 'from-green-800 via-teal-700 to-green-900',
  };

  const roomDecoration = {
    'modern-office': (
      <>
        <div className="absolute top-1/4 left-10 w-32 h-48 bg-gray-700/30 rounded-lg backdrop-blur-sm"></div>
        <div className="absolute top-1/3 right-10 w-24 h-32 bg-blue-600/20 rounded-lg backdrop-blur-sm"></div>
      </>
    ),
    'luxury-suite': (
      <>
        <div className="absolute top-1/4 left-16 w-40 h-56 bg-amber-600/20 rounded-lg backdrop-blur-sm"></div>
        <div className="absolute bottom-20 right-16 w-28 h-40 bg-yellow-500/20 rounded-lg backdrop-blur-sm"></div>
      </>
    ),
    'creative-space': (
      <>
        <div className="absolute top-20 left-20 w-36 h-52 bg-purple-600/30 rounded-2xl backdrop-blur-sm transform rotate-12"></div>
        <div className="absolute bottom-32 right-20 w-32 h-44 bg-pink-500/25 rounded-2xl backdrop-blur-sm transform -rotate-6"></div>
      </>
    ),
    'nature-retreat': (
      <>
        <div className="absolute top-16 left-12 w-44 h-60 bg-green-600/25 rounded-3xl backdrop-blur-sm"></div>
        <div className="absolute bottom-24 right-12 w-28 h-36 bg-teal-500/30 rounded-3xl backdrop-blur-sm"></div>
      </>
    ),
  };

  return (
    <div className={`relative w-full h-full bg-gradient-to-br ${roomStyles[room]} overflow-hidden`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] [background-size:20px_20px]"></div>
      </div>

      {/* Room Decoration */}
      {roomDecoration[room]}

      {/* Floor Grid */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black/40 to-transparent">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30"></div>
      </div>

      {/* Ambient Lighting */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* Center Stage */}
      <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 w-80 h-4 bg-white/10 rounded-full blur-sm"></div>
    </div>
  );
};

export default MeetingRoom;