import React, { useState } from 'react';
import { FileText, Download, Send, Edit3, Check, X, Printer } from 'lucide-react';

interface ContractGeneratorProps {
  currentDeal: any;
}

const ContractGenerator: React.FC<ContractGeneratorProps> = ({ currentDeal }) => {
  const [contractType, setContractType] = useState('standard');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [signatureStatus, setSignatureStatus] = useState('pending');

  const contractTypes = [
    { id: 'standard', name: 'Standard Package', template: 'Basic service agreement' },
    { id: 'premium', name: 'Premium Package', template: 'Enhanced service with premium features' },
    { id: 'enterprise', name: 'Enterprise Package', template: 'Full enterprise solution' },
    { id: 'custom', name: 'Custom Agreement', template: 'Tailored contract terms' },
  ];

  const generateContract = async () => {
    setIsGenerating(true);
    // Simulate AI contract generation
    setTimeout(() => {
      setIsGenerating(false);
      setShowPreview(true);
    }, 2000);
  };

  const contractData = {
    clientName: currentDeal?.clientName || 'Sarah Johnson',
    company: currentDeal?.company || 'TechCorp Industries',
    value: currentDeal?.value || 125000,
    startDate: '2025-02-01',
    duration: '12 months',
    terms: [
      'Monthly VR sales training sessions',
      'AI-powered analytics dashboard access',
      'Custom workflow automation setup',
      '24/7 technical support',
      'Quarterly performance reviews'
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Contract Generator</h1>
          <p className="text-gray-300">AI-powered contract generation and digital signing</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contract Configuration */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Contract Setup</h2>

              {/* Deal Information */}
              {currentDeal && (
                <div className="mb-6 p-4 bg-blue-600/20 border border-blue-500/30 rounded-lg">
                  <h3 className="text-blue-300 font-semibold mb-3">Current Deal</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Client:</span>
                      <span className="text-white">{currentDeal.clientName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Company:</span>
                      <span className="text-white">{currentDeal.company}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Value:</span>
                      <span className="text-green-400">${currentDeal.value?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Contract Type Selection */}
              <div className="mb-6">
                <label className="block text-white font-semibold mb-3">Contract Type</label>
                <div className="space-y-2">
                  {contractTypes.map((type) => (
                    <label key={type.id} className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="contractType"
                        value={type.id}
                        checked={contractType === type.id}
                        onChange={(e) => setContractType(e.target.value)}
                        className="mt-1"
                      />
                      <div>
                        <div className="text-white font-medium">{type.name}</div>
                        <div className="text-gray-400 text-sm">{type.template}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Custom Terms */}
              <div className="mb-6">
                <label className="block text-white font-semibold mb-3">Additional Terms</label>
                <textarea
                  className="w-full h-24 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add any custom terms or conditions..."
                ></textarea>
              </div>

              {/* Generate Button */}
              <button
                onClick={generateContract}
                disabled={isGenerating}
                className={`w-full py-3 rounded-lg flex items-center justify-center space-x-2 transition-all ${
                  isGenerating
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                <FileText className="w-5 h-5 text-white" />
                <span className="text-white">
                  {isGenerating ? 'Generating...' : 'Generate Contract'}
                </span>
              </button>
            </div>
          </div>

          {/* Contract Preview */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Contract Preview</h2>
                {showPreview && (
                  <div className="flex space-x-2">
                    <button className="p-2 bg-gray-600 hover:bg-gray-700 rounded-lg">
                      <Edit3 className="w-4 h-4 text-white" />
                    </button>
                    <button className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg">
                      <Download className="w-4 h-4 text-white" />
                    </button>
                    <button className="p-2 bg-gray-600 hover:bg-gray-700 rounded-lg">
                      <Printer className="w-4 h-4 text-white" />
                    </button>
                  </div>
                )}
              </div>

              {!showPreview ? (
                <div className="flex items-center justify-center h-96 border-2 border-dashed border-white/20 rounded-lg">
                  <div className="text-center">
                    <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">Configure and generate a contract to preview</p>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg p-8 text-gray-900">
                  {/* Contract Header */}
                  <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold mb-2">SERVICE AGREEMENT</h1>
                    <p className="text-gray-600">VR Sales Assistant Platform</p>
                  </div>

                  {/* Contract Details */}
                  <div className="grid grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="font-semibold mb-2">Service Provider</h3>
                      <p>VR Sales Solutions Inc.</p>
                      <p>123 Innovation Drive</p>
                      <p>Tech City, TC 12345</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Client</h3>
                      <p>{contractData.clientName}</p>
                      <p>{contractData.company}</p>
                      <p>contact@techcorp.com</p>
                    </div>
                  </div>

                  {/* Contract Terms */}
                  <div className="mb-8">
                    <h3 className="font-semibold mb-4">Terms and Conditions</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span>Contract Value:</span>
                        <span className="font-semibold">${contractData.value.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span>Start Date:</span>
                        <span>{contractData.startDate}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span>Duration:</span>
                        <span>{contractData.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Services Included */}
                  <div className="mb-8">
                    <h3 className="font-semibold mb-4">Services Included</h3>
                    <ul className="space-y-2">
                      {contractData.terms.map((term, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span>{term}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Signature Section */}
                  <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-200">
                    <div>
                      <h4 className="font-semibold mb-4">Service Provider</h4>
                      <div className="border-b border-gray-400 pb-2 mb-2">
                        <span className="text-gray-600">Digital Signature</span>
                      </div>
                      <p className="text-sm text-gray-600">Date: ________________</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-4">Client Signature</h4>
                      <div className="border-b border-gray-400 pb-2 mb-2">
                        <span className="text-gray-600">Awaiting Signature</span>
                      </div>
                      <p className="text-sm text-gray-600">Date: ________________</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Digital Signature */}
              {showPreview && (
                <div className="mt-6 p-4 bg-blue-600/20 border border-blue-500/30 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-blue-300 font-semibold">Digital Signature</h3>
                      <p className="text-gray-300 text-sm">Send contract for electronic signature</p>
                    </div>
                    <div className="flex space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        signatureStatus === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                        signatureStatus === 'signed' ? 'bg-green-500/20 text-green-300' :
                        'bg-red-500/20 text-red-300'
                      }`}>
                        {signatureStatus === 'pending' ? 'Pending' :
                         signatureStatus === 'signed' ? 'Signed' : 'Rejected'}
                      </span>
                      <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center space-x-2">
                        <Send className="w-4 h-4" />
                        <span>Send for Signature</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractGenerator;