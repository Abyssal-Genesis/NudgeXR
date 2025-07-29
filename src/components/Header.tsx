import React from 'react';
import { Headphones, Database, Workflow, BarChart3, FileText, Zap } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'vr-interface', label: 'VR Interface', icon: Headphones },
    { id: 'crm', label: 'CRM', icon: Database },
    { id: 'workflow', label: 'Workflow Editor', icon: Workflow },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'contracts', label: 'Contracts', icon: FileText },
  ];

  return (
    <header className="bg-black/20 backdrop-blur-lg border-b border-white/10">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">VR Sales Assistant</h1>
            <p className="text-sm text-gray-300">AI-Powered Deal Closing Platform</p>
          </div>
        </div>
        
        <nav className="flex space-x-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden md:inline">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;