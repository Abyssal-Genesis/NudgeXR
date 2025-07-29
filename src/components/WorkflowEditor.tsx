import React, { useState } from 'react';
import { Play, Plus, Settings, Trash2, ArrowRight, Zap, MessageSquare, Clock, CheckCircle } from 'lucide-react';

const WorkflowEditor: React.FC = () => {
  const [workflows, setWorkflows] = useState([
    {
      id: 1,
      name: 'High-Value Client Onboarding',
      status: 'active',
      triggers: ['Deal value > $100k', 'First VR meeting'],
      actions: 4,
      lastModified: '2025-01-16'
    },
    {
      id: 2,
      name: 'Objection Handling Sequence',
      status: 'draft',
      triggers: ['Price objection detected', 'Competitor mentioned'],
      actions: 6,
      lastModified: '2025-01-15'
    }
  ]);

  const [selectedWorkflow, setSelectedWorkflow] = useState(workflows[0]);
  const [draggedNode, setDraggedNode] = useState(null);

  const nodeTypes = [
    { type: 'trigger', icon: Zap, label: 'Trigger', color: 'green' },
    { type: 'message', icon: MessageSquare, label: 'Send Message', color: 'blue' },
    { type: 'delay', icon: Clock, label: 'Wait/Delay', color: 'yellow' },
    { type: 'condition', icon: Settings, label: 'Condition', color: 'purple' },
    { type: 'action', icon: CheckCircle, label: 'Action', color: 'red' }
  ];

  const workflowNodes = [
    { id: 1, type: 'trigger', x: 100, y: 100, title: 'Deal Value > $100k', content: 'Automatically trigger when deal exceeds threshold' },
    { id: 2, type: 'condition', x: 300, y: 100, title: 'Client Response Time', content: 'Check if client responds within 24 hours' },
    { id: 3, type: 'message', x: 500, y: 50, title: 'Premium Offer', content: 'Send premium package details' },
    { id: 4, type: 'message', x: 500, y: 150, title: 'Follow-up Message', content: 'Schedule follow-up call' },
    { id: 5, type: 'action', x: 700, y: 100, title: 'Generate Contract', content: 'Auto-generate personalized contract' }
  ];

  const connections = [
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 2, to: 4 },
    { from: 3, to: 5 },
    { from: 4, to: 5 }
  ];

  const getNodeColor = (type: string) => {
    const colors = {
      trigger: 'from-green-500 to-green-600',
      condition: 'from-purple-500 to-purple-600',
      message: 'from-blue-500 to-blue-600',
      action: 'from-red-500 to-red-600',
      delay: 'from-yellow-500 to-yellow-600'
    };
    return colors[type] || 'from-gray-500 to-gray-600';
  };

  const getNodeIcon = (type: string) => {
    const icons = {
      trigger: Zap,
      condition: Settings,
      message: MessageSquare,
      action: CheckCircle,
      delay: Clock
    };
    return icons[type] || Settings;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Workflow Editor</h1>
            <p className="text-gray-300">Create no-code sales automation workflows</p>
          </div>
          <div className="flex space-x-4">
            <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center space-x-2 transition-all">
              <Play className="w-4 h-4" />
              <span>Test Workflow</span>
            </button>
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center space-x-2 transition-all">
              <Plus className="w-4 h-4" />
              <span>New Workflow</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Workflow List */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Workflows</h2>
              <div className="space-y-3">
                {workflows.map((workflow) => (
                  <div
                    key={workflow.id}
                    onClick={() => setSelectedWorkflow(workflow)}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      selectedWorkflow.id === workflow.id
                        ? 'bg-blue-600/30 border border-blue-500'
                        : 'bg-white/5 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-white font-medium text-sm">{workflow.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        workflow.status === 'active' 
                          ? 'bg-green-500/20 text-green-300' 
                          : 'bg-gray-500/20 text-gray-300'
                      }`}>
                        {workflow.status}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs mb-2">{workflow.actions} actions</p>
                    <p className="text-gray-500 text-xs">Modified: {workflow.lastModified}</p>
                  </div>
                ))}
              </div>

              {/* Node Palette */}
              <div className="mt-8">
                <h3 className="text-white font-semibold mb-4">Add Nodes</h3>
                <div className="space-y-2">
                  {nodeTypes.map((nodeType) => {
                    const Icon = nodeType.icon;
                    return (
                      <div
                        key={nodeType.type}
                        draggable
                        onDragStart={() => setDraggedNode(nodeType)}
                        className="p-3 bg-white/5 hover:bg-white/10 rounded-lg cursor-move transition-all flex items-center space-x-3"
                      >
                        <div className={`w-8 h-8 bg-gradient-to-br from-${nodeType.color}-500 to-${nodeType.color}-600 rounded-lg flex items-center justify-center`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-white text-sm">{nodeType.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Canvas */}
          <div className="lg:col-span-3">
            <div className="bg-white/5 backdrop-blur-lg border border-white/20 rounded-xl p-6 min-h-[600px] relative overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">{selectedWorkflow.name}</h2>
                <div className="flex space-x-2">
                  <button className="p-2 bg-gray-600 hover:bg-gray-700 rounded-lg">
                    <Settings className="w-4 h-4 text-white" />
                  </button>
                  <button className="p-2 bg-red-600 hover:bg-red-700 rounded-lg">
                    <Trash2 className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>

              {/* Grid Background */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
              </div>

              {/* Workflow Canvas */}
              <div className="relative h-96 overflow-hidden">
                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {connections.map((connection, index) => {
                    const fromNode = workflowNodes.find(n => n.id === connection.from);
                    const toNode = workflowNodes.find(n => n.id === connection.to);
                    if (!fromNode || !toNode) return null;

                    return (
                      <line
                        key={index}
                        x1={fromNode.x + 80}
                        y1={fromNode.y + 40}
                        x2={toNode.x}
                        y2={toNode.y + 40}
                        stroke="rgba(59, 130, 246, 0.5)"
                        strokeWidth="2"
                        markerEnd="url(#arrowhead)"
                      />
                    );
                  })}
                  <defs>
                    <marker
                      id="arrowhead"
                      markerWidth="10"
                      markerHeight="7"
                      refX="9"
                      refY="3.5"
                      orient="auto"
                    >
                      <polygon
                        points="0 0, 10 3.5, 0 7"
                        fill="rgba(59, 130, 246, 0.5)"
                      />
                    </marker>
                  </defs>
                </svg>

                {/* Workflow Nodes */}
                {workflowNodes.map((node) => {
                  const Icon = getNodeIcon(node.type);
                  return (
                    <div
                      key={node.id}
                      className="absolute group cursor-move"
                      style={{ left: node.x, top: node.y }}
                    >
                      <div className={`w-80 bg-gradient-to-br ${getNodeColor(node.type)} rounded-lg p-4 shadow-lg border border-white/20 group-hover:scale-105 transition-all`}>
                        <div className="flex items-center space-x-3 mb-2">
                          <Icon className="w-5 h-5 text-white" />
                          <h4 className="text-white font-semibold">{node.title}</h4>
                        </div>
                        <p className="text-white/80 text-sm">{node.content}</p>
                        
                        {/* Node Controls */}
                        <div className="flex justify-end space-x-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1 bg-white/20 hover:bg-white/30 rounded">
                            <Settings className="w-3 h-3 text-white" />
                          </button>
                          <button className="p-1 bg-white/20 hover:bg-white/30 rounded">
                            <Trash2 className="w-3 h-3 text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Workflow Properties */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Triggers</h4>
                  <div className="space-y-2">
                    {selectedWorkflow.triggers.map((trigger, index) => (
                      <div key={index} className="text-sm text-gray-300 bg-green-500/20 rounded px-2 py-1">
                        {trigger}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Statistics</h4>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex justify-between">
                      <span>Executions:</span>
                      <span className="text-white">247</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Success Rate:</span>
                      <span className="text-green-400">94%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg. Duration:</span>
                      <span className="text-blue-400">2.3s</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Settings</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-sm text-gray-300">Auto-execute</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-gray-300">Send notifications</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-sm text-gray-300">Log activities</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowEditor;