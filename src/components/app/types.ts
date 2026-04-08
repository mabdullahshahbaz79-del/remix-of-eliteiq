export interface AssetMetadata {
  title: string;
  description: string;
  keywords: string[];
  confidence: number;
  platforms: Record<string, PlatformMeta>;
}

export interface PlatformMeta {
  title: string;
  description: string;
  keywords: string[];
  ready: boolean;
}

export type AssetStatus = 'ready' | 'processing' | 'done' | 'error';

export interface Asset {
  id: string;
  name: string;
  size: number;
  compressedSize?: number;
  type: string;
  thumbnail: string;
  status: AssetStatus;
  metadata?: AssetMetadata;
  dimensions?: { width: number; height: number };
  addedAt: number;
}

export interface AppSettings {
  aiMode: 'auto' | 'cloud' | 'offline';
  provider: string;
  apiKeys: {
    openai: string;
    gemini: string;
    groq: string;
    ollama: string;
  };
  metadataRules: {
    singleWord: boolean;
    multiWord: boolean;
    keywordCount: number;
    negativeKeywords: string;
    autoCapitalize: boolean;
    removeDuplicates: boolean;
    enforceBrandFilter: boolean;
    addSeriesNumbers: boolean;
  };
  advanced: {
    parallelWorkers: number;
    autoRetry: boolean;
    descriptionMinWords: number;
    descriptionMaxWords: number;
    confidenceThreshold: number;
    autoEmbed: boolean;
    autoDelete: boolean;
    saveBackups: boolean;
  };
}

export const defaultSettings: AppSettings = {
  aiMode: 'auto',
  provider: 'gemini',
  apiKeys: { openai: '', gemini: '', groq: '', ollama: 'http://localhost:11434' },
  metadataRules: {
    singleWord: true,
    multiWord: true,
    keywordCount: 30,
    negativeKeywords: '',
    autoCapitalize: true,
    removeDuplicates: true,
    enforceBrandFilter: true,
    addSeriesNumbers: false,
  },
  advanced: {
    parallelWorkers: 3,
    autoRetry: true,
    descriptionMinWords: 10,
    descriptionMaxWords: 50,
    confidenceThreshold: 0.7,
    autoEmbed: false,
    autoDelete: false,
    saveBackups: true,
  },
};

export const SUPPORTED_PLATFORMS = [
  'Adobe Stock', 'Shutterstock', 'Getty Images', 'iStock',
  'Freepik', 'Dreamstime', 'Alamy', '123RF', 'Pond5'
] as const;
