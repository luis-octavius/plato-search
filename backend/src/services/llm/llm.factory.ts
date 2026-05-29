import { LLMProvider } from '../../types';
import { GeminiProvider } from './gemini.provider';

/**
 * Factory for creating LLM provider instances.
 * Supports multiple provider implementations (Gemini, Anthropic, etc.)
 */
export class LLMProviderFactory {
  /**
   * Creates an LLM provider based on the specified type
   * @param type - Provider type: 'gemini' or 'anthropic'
   * @param apiKey - API key for the provider
   * @param adaptationPrompt - Custom adaptation prompt
   * @returns LLMProvider instance
   */
  static createProvider(
    type: 'gemini' | 'anthropic' = 'gemini',
    apiKey?: string,
    adaptationPrompt?: string
  ): LLMProvider {
    const key = apiKey || process.env.GEMINI_API_KEY;
    const prompt = adaptationPrompt || process.env.ADAPTATION_PROMPT;

    switch (type) {
      case 'gemini':
        return new GeminiProvider(key || '', prompt || '');

      case 'anthropic':
        throw new Error('Anthropic provider not yet implemented');

      default:
        throw new Error(`Unknown LLM provider type: ${type}`);
    }
  }

  /**
   * Creates the default provider based on environment configuration
   * @returns LLMProvider instance
   */
  static createDefault(): LLMProvider {
    const providerType = (process.env.LLM_PROVIDER || 'gemini') as 'gemini' | 'anthropic';
    return this.createProvider(
      providerType,
      process.env.GEMINI_API_KEY,
      process.env.ADAPTATION_PROMPT
    );
  }
}
