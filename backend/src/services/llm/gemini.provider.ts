import { LLMProvider, AdaptationLevel, LLMRequest, LLMResponse } from '../../types';

/**
 * GeminiProvider implements the LLMProvider interface using Google's Gemini API.
 * Adapts Platonic texts to Portuguese at different difficulty levels.
 */
export class GeminiProvider implements LLMProvider {
  private apiKey: string;
  private adaptationPrompt: string;
  private readonly apiBaseUrl = 'https://generativelanguage.googleapis.com/v1beta/models';
  private readonly model = 'gemini-1.5-flash'; // Free tier model

  constructor(apiKey: string, adaptationPrompt: string) {
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is required');
    }
    if (!adaptationPrompt) {
      throw new Error('ADAPTATION_PROMPT environment variable is required');
    }

    this.apiKey = apiKey;
    this.adaptationPrompt = adaptationPrompt;
  }

  /**
   * Adapts a passage of text to a specific difficulty level.
   * @param request - LLMRequest containing the text and target level
   * @returns Promise<LLMResponse> with the adapted text
   */
  async adapt(request: LLMRequest): Promise<LLMResponse> {
    try {
      const levelInstructions = this.getLevelInstructions(request.level);
      const systemPrompt = `${this.adaptationPrompt}\n\n${levelInstructions}`;

      const response = await fetch(
        `${this.apiBaseUrl}/${this.model}:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: systemPrompt }],
            },
            contents: [
              {
                parts: [{ text: request.text }],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 1000,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = (await response.json()) as { error?: { message?: string } };
        throw new Error(
          `Gemini API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`
        );
      }

      const data = (await response.json()) as {
        candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
      };
      const adaptedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!adaptedText) {
        throw new Error('No content returned from Gemini API');
      }

      return {
        adapted: adaptedText,
        provider: 'gemini',
        tokensUsed: this.estimateTokens(adaptedText),
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`GeminiProvider error: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Returns specific instructions for each adaptation level
   */
  private getLevelInstructions(level: AdaptationLevel): string {
    const instructions = {
      beginner:
        'Adapt this text to an accessible Portuguese for high school students (ages 14-15). Use simple vocabulary, short sentences, and explain difficult concepts. Aim for ~5th grade reading level.',
      intermediate:
        'Adapt this text to Portuguese for high school students (ages 16-17). Use standard vocabulary and sentence structure. Preserve philosophical nuance while remaining clear and engaging.',
      advanced:
        'Adapt this text to Portuguese for advanced high school students or college students (ages 18+). Maintain philosophical depth and precision. Use sophisticated vocabulary and complex sentence structures where appropriate.',
    };

    return instructions[level] || instructions.intermediate;
  }

  /**
   * Rough estimation of tokens used (1 token ≈ 4 characters)
   */
  private estimateTokens(text: string): number {
    return Math.ceil(text.length / 4);
  }
}
