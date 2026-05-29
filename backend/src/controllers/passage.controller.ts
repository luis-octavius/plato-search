import { Request, Response, NextFunction } from 'express';
import { PerseusService, LLMProviderFactory } from '../services';
import { AdaptationLevel } from '../types';

export interface PassageRequest extends Request {
  query: {
    dialogue: string;
    stephanus: string;
  };
}

export interface PassageResponseBody {
  success: boolean;
  data?: {
    reference: string;
    greek: string;
    english: string;
    adaptations: {
      beginner: string;
      intermediate: string;
      advanced: string;
    };
  };
  error?: string;
}

/**
 * PassageController handles HTTP requests for passage retrieval and adaptation
 */
export class PassageController {
  private perseusService: PerseusService;
  private llmProvider;

  constructor() {
    this.perseusService = new PerseusService();
    this.llmProvider = LLMProviderFactory.createDefault();
  }

  /**
   * GET /api/passages/search
   * Retrieves a Platonic passage and adapts it to three difficulty levels
   */
  async search(req: PassageRequest, res: Response<PassageResponseBody>, next: NextFunction): Promise<void> {
    try {
      const { dialogue, stephanus } = req.query;

      // Validate input
      if (!dialogue || !stephanus) {
        res.status(400).json({
          success: false,
          error: 'Missing required parameters: dialogue and stephanus',
        });
        return;
      }

      // Fetch passage from Perseus
      const passage = await this.perseusService.searchPassage(dialogue, stephanus);

      // Adapt the English text to three levels
      const englishText = passage.english || passage.greek;

      const [beginnerAdapted, intermediateAdapted, advancedAdapted] = await Promise.all([
        this.adaptPassage(englishText, 'beginner'),
        this.adaptPassage(englishText, 'intermediate'),
        this.adaptPassage(englishText, 'advanced'),
      ]);

      res.status(200).json({
        success: true,
        data: {
          reference: passage.reference,
          greek: passage.greek,
          english: englishText,
          adaptations: {
            beginner: beginnerAdapted,
            intermediate: intermediateAdapted,
            advanced: advancedAdapted,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/passages/dialogues
   * Lists all available Platonic dialogues
   */
  async listDialogues(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dialogues = this.perseusService.listAvailableDialogues();
      res.status(200).json({
        success: true,
        data: {
          dialogues,
          count: dialogues.length,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Adapts a text using the LLM provider
   */
  private async adaptPassage(text: string, level: AdaptationLevel): Promise<string> {
    try {
      const response = await this.llmProvider.adapt({
        text,
        level,
      });
      return response.adapted;
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Adaptation error for ${level}:`, error.message);
      }
      return `[Adaptation failed for ${level} level]`;
    }
  }
}
