import React, { useState } from 'react';
import { TrendingUp, Users, DollarSign, Clock, Eye, MousePointer, Activity } from 'lucide-react';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');

  const stats = [
    { label: 'Total Revenue', value: '$2.4M', change: '+12%', icon: DollarSign, color: 'green' },
    { label: 'Active Deals', value: '47', change: '+8%', icon: Activity, color: 'blue' },
    { label: 'Close Rate', value: '68%', change: '+5%', icon: TrendingUp, color: 'purple' },
    { label: 'Avg Deal Time', value: '12.5d', change: '-3%', icon: Clock, color: 'orange' },
  ];

  const heatmapData = [
    { zone: 'Product Demo', interactions: 45, duration: '8:32', color: 'bg-red-500' },
    { zone: 'Pricing Discussion', interactions: 38, duration: '6:15', color: 'bg-orange-500' },
    { zone: 'Contract Terms', interactions: 22, duration: '4:20', color: 'bg-yellow-500' },
    { zone: 'Objection Handling', interactions: 31, duration: '5:45', color: 'bg-green-500' },
    { zone: 'Closing Questions', interactions: 19, duration: '3:30', color: 'bg-blue-500' },
  ];

  const performanceData = [
    { agent: 'Sarah Miller', deals: 12, revenue: 450000, closeRate: 75, avgTime: '10.2d' },
    { agent: 'Mike Johnson', deals: 9, revenue: 320000, closeRate: 67, avgTime: '14.1d' },
    { agent: 'Emily Chen', deals: 15, revenue: 580000, closeRate: 80, avgTime: '9.8d' },
    { agent: 'David Brown', deals: 8, revenue: 280000, closeRate: 62, avgTime: '16.5d' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
            <p className="text-gray-300">Track performance and optimize your VR sales process</p>
          </div>
          <div className="flex space-x-2">
            {['7d', '30d', '90d', '1y'].map((period) => (
              <button
                key={period}
                onClick={() => setTimeRange(period)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  timeRange === period
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-${stat.color}-500/20 rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-400`} />
                  </div>
                  <span className={`text-sm font-medium ${
                    stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* VR Interaction Heatmap */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">VR Interaction Heatmap</h2>
            <div className="space-y-4">
              {heatmapData.map((zone, index) => (
                <div key={index} className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">{zone.zone}</span>
                    <div className="flex items-center space-x-4 text-sm text-gray-300">
                      <span className="flex items-center space-x-1">
                        <MousePointer className="w-4 h-4" />
                        <span>{zone.interactions}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{zone.duration}</span>
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full ${zone.color} opacity-80`}
                      style={{ width: `${(zone.interactions / 50) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conversion Funnel */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Conversion Funnel</h2>
            <div className="space-y-4">
              {[
                { stage: 'VR Sessions Started', count: 156, percentage: 100 },
                { stage: 'Product Demo Completed', count: 142, percentage: 91 },
                { stage: 'Proposal Presented', count: 98, percentage: 63 },
                { stage: 'Negotiation Started', count: 76, percentage: 49 },
                { stage: 'Deal Closed', count: 47, percentage: 30 },
              ].map((stage, index) => (
                <div key={index} className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">{stage.stage}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-bold">{stage.count}</span>
                      <span className="text-gray-400 text-sm">({stage.percentage}%)</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                      style={{ width: `${stage.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Agent Performance */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Agent Performance</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left text-gray-300 font-medium py-3">Agent</th>
                  <th className="text-left text-gray-300 font-medium py-3">Deals Closed</th>
                  <th className="text-left text-gray-300 font-medium py-3">Revenue</th>
                  <th className="text-left text-gray-300 font-medium py-3">Close Rate</th>
                  <th className="text-left text-gray-300 font-medium py-3">Avg Deal Time</th>
                  <th className="text-left text-gray-300 font-medium py-3">Performance</th>
                </tr>
              </thead>
              <tbody>
                {performanceData.map((agent, index) => (
                  <tr key={index} className="border-b border-white/10">
                    <td className="py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {agent.agent.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="text-white font-medium">{agent.agent}</span>
                      </div>
                    </td>
                    <td className="py-4 text-white">{agent.deals}</td>
                    <td className="py-4 text-green-400 font-semibold">${agent.revenue.toLocaleString()}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        agent.closeRate >= 75 ? 'bg-green-500/20 text-green-300' :
                        agent.closeRate >= 65 ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-red-500/20 text-red-300'
                      }`}>
                        {agent.closeRate}%
                      </span>
                    </td>
                    <td className="py-4 text-gray-300">{agent.avgTime}</td>
                    <td className="py-4">
                      <div className="w-24 bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full ${
                            agent.closeRate >= 75 ? 'bg-green-500' :
                            agent.closeRate >= 65 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${agent.closeRate}%` }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;