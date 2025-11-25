import React, { createContext, useContext, ReactNode, useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { AIConfig, ConnectionStatus } from '../types';
import { LLMService } from '../services/llmService';

interface AIContextType {
  config: AIConfig;
  setConfig: (config: AIConfig) => void;
  isSettingsOpen: boolean;
  setSettingsOpen: (isOpen: boolean) => void;
  connectionStatus: ConnectionStatus;
  checkConnection: () => Promise<void>;
}

const DEFAULT_AI_CONFIG: AIConfig = {
  provider: 'gemini',
  baseUrl: 'https://generativelanguage.googleapis.com',
  modelName: 'gemini-pro',
  apiKey: (process.env.GEMINI_API_KEY as string) || '',
};

const AIContext = createContext<AIContextType | undefined>(undefined);

export const AIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [config, setConfig] = useLocalStorage<AIConfig>('notara-ai-config', DEFAULT_AI_CONFIG);
  const [isSettingsOpen, setSettingsOpen] = useLocalStorage<boolean>('notara-ai-modal-open', false);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('checking');

  const checkConnection = useCallback(async () => {
    setConnectionStatus('checking');
    const service = new LLMService(config);
    const result = await service.verifyConnection();
    setConnectionStatus(result.success ? 'connected' : 'disconnected');
  }, [config]);

  useEffect(() => {
    checkConnection();
    
    let interval: NodeJS.Timeout | undefined;
    if (config.provider === 'ollama') {
      interval = setInterval(checkConnection, 30000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [config, checkConnection]);

  return (
    <AIContext.Provider value={{ config, setConfig, isSettingsOpen, setSettingsOpen, connectionStatus, checkConnection }}>
      {children}
    </AIContext.Provider>
  );
};

export const useAI = () => {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
};
