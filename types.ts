
export type AIProviderId = 'ollama' | 'openai' | 'anthropic' | 'gemini' | 'groq' | 'custom';
export type ConnectionStatus = 'connected' | 'checking' | 'disconnected';

export interface AIConfig {
  provider: AIProviderId;
  apiKey?: string;
  baseUrl?: string;
  modelName: string;
}

export interface ChatMessage {
  role: 'user' | 'system' | 'assistant';
  content: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: number;
  folderId?: string;
  tags?: string[];
  isFavorite?: boolean;
}

export interface Folder {
  id: string;
  name: string;
  parentId?: string;
  createdAt: number;
}