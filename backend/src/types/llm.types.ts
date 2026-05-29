import { AdaptationLevel } from './adaptation.types';

/**
 * Request object for LLM adaptation
 */
export interface LLMRequest {
  text: string;
  level: AdaptationLevel;
}

/**
 * Response object from LLM adaptation
 */
export interface LLMResponse {
  adapted: string;
  provider: string;
  tokensUsed?: number;
}

/**
 * Strategy interface for different LLM providers
 * Any provider (Gemini, Anthropic, etc.) must implement this interface
 */
export interface LLMProvider {
  /**
   * Adapts a text to a specific difficulty level
   */
  adapt(request: LLMRequest): Promise<LLMResponse>;
}