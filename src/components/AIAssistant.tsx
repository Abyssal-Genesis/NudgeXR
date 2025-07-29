import React, { useState, useEffect } from 'react';
import { Bot, Send, Lightbulb, TrendingUp, AlertTriangle, Clock } from 'lucide-react';

interface AIAssistantProps {
  currentDeal: any;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ currentDeal }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [realTimeAnalysis, setRealTimeAnalysis] = useState({
    sentiment: 'positive',
    engagementLevel: 78,
    closingProbability: 65,
    recommendedAction: 'present_premium_option'
  });

  const chatHistory = [
    {
      type: 'ai',
      message: 'Client is showing strong interest in the premium features. Consider highlighting ROI benefits.',
      timestamp: '2:34 PM'
    },
    {
      type: 'ai',
      message: 'Detected price sensitivity. Suggest offering a payment plan or limited-time discount.',
      timestamp: '2:31 PM'
    },
    {
      type: 'user',
      message: 'What closing technique should I use here?',
      timestamp: '2:28 PM'
    }
  ];

  useEffect(() => {
    // Simulate real-time AI suggestions based on current deal
    const generateSuggestions = () => {
      const baseSuggestions = [
        {
          type: 'closing',
          icon: TrendingUp,
          title: 'Try Assumptive Close',
          description: 'Client engagement is high. Ask "When would you like to start?"',
          confidence: 85
        },
        {
          type: 'objection',
          icon: AlertTriangle,
          title: 'Address Price Concern',
          description: 'Detected budget hesitation. Emphasize long-term value and ROI.',
          confidence: 72
        },
        {
          type: 'urgency',
          icon: Clock,
          title: 'Create Urgency',
          description: 'Mention limited-time offer or Q1 pricing incentive.',
          confidence: 68
        }
      ];

      setSuggestions(baseSuggestions);
    };

    generateSuggestions();
    const interval = setInterval(generateSuggestions, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [currentDeal]);

  const sendMessage = () => {
    if (message.trim()) {
      // Handle sending message to AI
      setMessage('');
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-400';
      case 'neutral': return 'text-yellow-400';
      case 'negative': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className={`fixed right-0 top-16 h-[calc(100vh-4rem)] bg-black/40 backdrop-blur-lg border-l border-white/20 transition-all duration-300 ${
      isExpanded ? 'w-96' : 'w-16'
    }`}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -left-4 top-8 w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-all"
      >
        <Bot className="w-4 h-4 text-white" />
      </button>

      {isExpanded && (
        <div className="h-full flex flex-col p-4">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-white font-bold">AI Assistant</h2>
                <p className="text-gray-300 text-xs">Real-time sales guidance</p>
              </div>
            </div>
          </div>

          {/* Real-time Analysis */}
          <div className="mb-6 p-4 bg-white/10 rounded-lg">
            <h3 className="text-white font-semibold mb-3">Live Analysis</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">Sentiment:</span>
                <span className={`text-sm font-medium ${getSentimentColor(realTimeAnalysis.sentiment)}`}>
                  {realTimeAnalysis.sentiment}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">Engagement:</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500"
                      style={{ width: `${realTimeAnalysis.engagementLevel}%` }}
                    ></div>
                  </div>
                  <span className="text-white text-xs">{realTimeAnalysis.engagementLevel}%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">Close Probability:</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500"
                      style={{ width: `${realTimeAnalysis.closingProbability}%` }}
                    ></div>
                  </div>
                  <span className="text-white text-xs">{realTimeAnalysis.closingProbability}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Suggestions */}
          <div className="mb-6">
            <h3 className="text-white font-semibold mb-3">Smart Suggestions</h3>
            <div className="space-y-3">
              {suggestions.map((suggestion, index) => {
                const Icon = suggestion.icon;
                return (
                  <div key={index} className="p-3 bg-white/5 hover:bg-white/10 rounded-lg cursor-pointer transition-all">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-medium text-sm mb-1">{suggestion.title}</h4>
                        <p className="text-gray-400 text-xs mb-2">{suggestion.description}</p>
                        <div className="flex items-center space-x-2">
                          <div className="w-12 h-1 bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-500"
                              style={{ width: `${suggestion.confidence}%` }}
                            ></div>
                          </div>
                          <span className="text-green-400 text-xs">{suggestion.confidence}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chat History */}
          <div className="flex-1 mb-4">
            <h3 className="text-white font-semibold mb-3">Chat History</h3>
            <div className="space-y-3 h-48 overflow-y-auto">
              {chatHistory.map((chat, index) => (
                <div key={index} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    chat.type === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white/10 text-gray-300'
                  }`}>
                    <p className="text-sm">{chat.message}</p>
                    <p className="text-xs opacity-70 mt-1">{chat.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Input */}
          <div className="flex space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask AI for help..."
              className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={sendMessage}
              className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;