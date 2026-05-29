/**
 * LLMProvider Interface - Strategy Pattern
 * Any LLM provider must implement this interface
 */

import { AdaptationLevel } from '../types/adaptation.types';

export interface LLMRequest {
  text: string;
  level: AdaptationLevel;
}

export interface LLMResponse {
  adapted: string;
}

export interface LLMProvider {
  /**
   * Adapt a passage to a specific learning level
   * @param request - The text and target adaptation level
   * @returns Promise with adapted text
   */
  adapt(request: LLMRequest): Promise<LLMResponse>;
}
