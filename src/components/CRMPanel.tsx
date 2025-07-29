import React, { useState } from 'react';
import { Search, Plus, Filter, Star, Phone, Mail, Calendar, DollarSign } from 'lucide-react';

interface CRMPanelProps {
  currentDeal: any;
  setCurrentDeal: (deal: any) => void;
}

const CRMPanel: React.FC<CRMPanelProps> = ({ currentDeal, setCurrentDeal }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStage, setFilterStage] = useState('all');

  const [leads] = useState([
    {
      id: 1,
      clientName: 'Sarah Johnson',
      company: 'TechCorp Industries',
      email: 'sarah.j@techcorp.com',
      phone: '+1 (555) 123-4567',
      value: 125000,
      stage: 'negotiation',
      priority: 'high',
      lastContact: '2025-01-15',
      notes: 'Interested in premium package. Price sensitive.',
      avatar: 'SJ'
    },
    {
      id: 2,
      clientName: 'Michael Chen',
      company: 'StartupXYZ',
      email: 'm.chen@startupxyz.com',
      phone: '+1 (555) 987-6543',
      value: 85000,
      stage: 'proposal',
      priority: 'medium',
      lastContact: '2025-01-14',
      notes: 'Needs custom integration. Technical decision maker.',
      avatar: 'MC'
    },
    {
      id: 3,
      clientName: 'Emily Rodriguez',
      company: 'Global Solutions',
      email: 'e.rodriguez@globalsol.com',
      phone: '+1 (555) 456-7890',
      value: 200000,
      stage: 'closing',
      priority: 'high',
      lastContact: '2025-01-16',
      notes: 'Ready to sign. Waiting for legal approval.',
      avatar: 'ER'
    }
  ]);

  const stages = ['all', 'lead', 'qualified', 'proposal', 'negotiation', 'closing', 'won', 'lost'];
  const priorities = { high: 'red', medium: 'yellow', low: 'green' };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = filterStage === 'all' || lead.stage === filterStage;
    return matchesSearch && matchesStage;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">CRM Dashboard</h1>
          <p className="text-gray-300">Manage your leads and track deal progress</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={filterStage}
              onChange={(e) => setFilterStage(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {stages.map(stage => (
                <option key={stage} value={stage} className="bg-gray-800 text-white">
                  {stage.charAt(0).toUpperCase() + stage.slice(1)}
                </option>
              ))}
            </select>

            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center space-x-2 transition-all">
              <Plus className="w-4 h-4" />
              <span>Add Lead</span>
            </button>
          </div>
        </div>

        {/* Leads Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredLeads.map((lead) => (
            <div
              key={lead.id}
              onClick={() => setCurrentDeal(lead)}
              className={`bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 cursor-pointer transition-all hover:bg-white/15 hover:scale-105 ${
                currentDeal?.id === lead.id ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {lead.avatar}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{lead.clientName}</h3>
                    <p className="text-gray-300 text-sm">{lead.company}</p>
                  </div>
                </div>
                <div className={`w-3 h-3 rounded-full bg-${priorities[lead.priority]}-500`}></div>
              </div>

              {/* Deal Value */}
              <div className="flex items-center space-x-2 mb-3">
                <DollarSign className="w-4 h-4 text-green-400" />
                <span className="text-green-400 font-semibold">${lead.value.toLocaleString()}</span>
              </div>

              {/* Stage */}
              <div className="mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  lead.stage === 'closing' ? 'bg-green-500/20 text-green-300' :
                  lead.stage === 'negotiation' ? 'bg-yellow-500/20 text-yellow-300' :
                  lead.stage === 'proposal' ? 'bg-blue-500/20 text-blue-300' :
                  'bg-gray-500/20 text-gray-300'
                }`}>
                  {lead.stage.charAt(0).toUpperCase() + lead.stage.slice(1)}
                </span>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-gray-300 text-sm">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{lead.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300 text-sm">
                  <Phone className="w-4 h-4" />
                  <span>{lead.phone}</span>
                </div>
              </div>

              {/* Notes */}
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{lead.notes}</p>

              {/* Last Contact */}
              <div className="flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>Last contact: {lead.lastContact}</span>
                </div>
                <button className="text-blue-400 hover:text-blue-300">
                  Start VR Session
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Total Pipeline</p>
                <p className="text-2xl font-bold text-white">${(125000 + 85000 + 200000).toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Active Deals</p>
                <p className="text-2xl font-bold text-white">{filteredLeads.length}</p>
              </div>
              <Star className="w-8 h-8 text-yellow-400" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Close Rate</p>
                <p className="text-2xl font-bold text-white">68%</p>
              </div>
              <Filter className="w-8 h-8 text-blue-400" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Avg Deal Size</p>
                <p className="text-2xl font-bold text-white">${Math.round((125000 + 85000 + 200000) / 3).toLocaleString()}</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CRMPanel;