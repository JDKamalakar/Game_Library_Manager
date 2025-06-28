import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings, Key, User, Globe, CheckCircle, XCircle, ExternalLink } from 'lucide-react';
import { steamApiService } from '../../services/steamApi';
import { SteamApiConfig } from '../../types/steam';

interface SteamApiConfigProps {
  onConfigured: () => void;
}

export const SteamApiConfigComponent: React.FC<SteamApiConfigProps> = ({ onConfigured }) => {
  const [config, setConfig] = useState<SteamApiConfig>({
    apiKey: '',
    steamId: '',
    proxyUrl: ''
  });
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    const existingConfig = steamApiService.getConfig();
    if (existingConfig) {
      setConfig(existingConfig);
    }
  }, []);

  const handleTestConnection = async () => {
    if (!config.apiKey || !config.steamId) {
      setConnectionStatus('error');
      return;
    }

    setIsTestingConnection(true);
    setConnectionStatus('idle');

    try {
      steamApiService.setConfig(config);
      const isConnected = await steamApiService.testConnection();
      setConnectionStatus(isConnected ? 'success' : 'error');
      
      if (isConnected) {
        setTimeout(() => {
          onConfigured();
        }, 1500);
      }
    } catch (error) {
      console.error('Connection test failed:', error);
      setConnectionStatus('error');
    } finally {
      setIsTestingConnection(false);
    }
  };

  const handleSaveConfig = () => {
    steamApiService.setConfig(config);
    onConfigured();
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <motion.div
        className="gamer-card max-w-2xl w-full p-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Settings size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold gamer-text-gradient mb-2">Steam API Configuration</h1>
          <p className="text-gray-400">
            Configure your Steam API credentials to access your game library
          </p>
        </div>

        <div className="space-y-6">
          {/* API Key Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Key size={16} className="inline mr-2" />
              Steam API Key
            </label>
            <input
              type="password"
              placeholder="Enter your Steam API key"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-colors text-white"
              value={config.apiKey}
              onChange={(e) => setConfig(prev => ({ ...prev, apiKey: e.target.value }))}
            />
            <p className="text-xs text-gray-500 mt-1">
              Get your API key from{' '}
              <a 
                href="https://steamcommunity.com/dev/apikey" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                steamcommunity.com/dev/apikey
                <ExternalLink size={12} className="inline ml-1" />
              </a>
            </p>
          </div>

          {/* Steam ID Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <User size={16} className="inline mr-2" />
              Steam ID
            </label>
            <input
              type="text"
              placeholder="Enter your Steam ID (64-bit)"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-colors text-white"
              value={config.steamId}
              onChange={(e) => setConfig(prev => ({ ...prev, steamId: e.target.value }))}
            />
            <p className="text-xs text-gray-500 mt-1">
              Find your Steam ID at{' '}
              <a 
                href="https://steamidfinder.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                steamidfinder.com
                <ExternalLink size={12} className="inline ml-1" />
              </a>
            </p>
          </div>

          {/* Advanced Settings */}
          <div>
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-sm text-gray-400 hover:text-gray-300 transition-colors"
            >
              Advanced Settings {showAdvanced ? '▼' : '▶'}
            </button>
            
            {showAdvanced && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
                className="mt-4"
              >
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Globe size={16} className="inline mr-2" />
                  CORS Proxy URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://your-cors-proxy.com"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-colors text-white"
                  value={config.proxyUrl}
                  onChange={(e) => setConfig(prev => ({ ...prev, proxyUrl: e.target.value }))}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Use a CORS proxy if you encounter cross-origin issues
                </p>
              </motion.div>
            )}
          </div>

          {/* Connection Status */}
          {connectionStatus !== 'idle' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-center space-x-2 p-3 rounded-lg ${
                connectionStatus === 'success' 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-red-500/20 text-red-400'
              }`}
            >
              {connectionStatus === 'success' ? (
                <CheckCircle size={20} />
              ) : (
                <XCircle size={20} />
              )}
              <span className="text-sm font-medium">
                {connectionStatus === 'success' 
                  ? 'Connection successful! Redirecting...' 
                  : 'Connection failed. Please check your credentials.'}
              </span>
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
            <button
              onClick={handleTestConnection}
              disabled={isTestingConnection || !config.apiKey || !config.steamId}
              className="flex-1 gamer-btn gamer-btn-primary"
            >
              {isTestingConnection ? (
                <>
                  <div className="gamer-spinner mr-2" />
                  Testing Connection...
                </>
              ) : (
                'Test Connection'
              )}
            </button>
            
            <button
              onClick={handleSaveConfig}
              disabled={!config.apiKey || !config.steamId}
              className="flex-1 gamer-btn gamer-btn-secondary"
            >
              Save Configuration
            </button>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 p-4 bg-gray-800/50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-300 mb-2">Need Help?</h3>
          <ul className="text-xs text-gray-500 space-y-1">
            <li>• Your Steam profile must be public to access game data</li>
            <li>• API keys are free and can be generated instantly</li>
            <li>• Steam ID is a unique 17-digit number identifying your account</li>
            <li>• CORS proxy is only needed for browser-based applications</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};