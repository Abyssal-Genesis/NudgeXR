import React from 'react';
import { User } from 'lucide-react';

interface AvatarProps {
  name: string;
  role: 'agent' | 'client';
  avatar: string;
  isActive: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ name, role, avatar, isActive }) => {
  const avatarColors = {
    'agent-1': 'from-blue-500 to-blue-700',
    'client-1': 'from-green-500 to-green-700',
    'client-2': 'from-purple-500 to-purple-700',
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className={`relative ${isActive ? 'animate-pulse' : ''}`}>
        <div
          className={`w-16 h-16 rounded-full bg-gradient-to-br ${
            avatarColors[avatar] || 'from-gray-500 to-gray-700'
          } flex items-center justify-center border-4 ${
            isActive ? 'border-green-400' : 'border-gray-600'
          } transition-all duration-300`}
        >
          <User className="w-8 h-8 text-white" />
        </div>
        {isActive && (
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-gray-800 flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        )}
      </div>
      <div className="text-center">
        <p className="text-white text-sm font-medium">{name}</p>
        <p className="text-gray-400 text-xs capitalize">{role}</p>
      </div>
    </div>
  );
};

export default Avatar;