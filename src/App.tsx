import React, { useState } from 'react';
import Header from './components/Header';
import VRInterface from './components/VRInterface';
import CRMPanel from './components/CRMPanel';
import WorkflowEditor from './components/WorkflowEditor';
import Analytics from './components/Analytics';
import ContractGenerator from './components/ContractGenerator';
import AIAssistant from './components/AIAssistant';

function App() {
  const [activeTab, setActiveTab] = useState('vr-interface');
  const [currentDeal, setCurrentDeal] = useState(null);

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'vr-interface':
        return <VRInterface currentDeal={currentDeal} setCurrentDeal={setCurrentDeal} />;
      case 'crm':
        return <CRMPanel currentDeal={currentDeal} setCurrentDeal={setCurrentDeal} />;
      case 'workflow':
        return <WorkflowEditor />;
      case 'analytics':
        return <Analytics />;
      case 'contracts':
        return <ContractGenerator currentDeal={currentDeal} />;
      default:
        return <VRInterface currentDeal={currentDeal} setCurrentDeal={setCurrentDeal} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex">
        <div className="flex-1">
          {renderActiveComponent()}
        </div>
        <AIAssistant currentDeal={currentDeal} />
      </div>
    </div>
  );
}

export default App;