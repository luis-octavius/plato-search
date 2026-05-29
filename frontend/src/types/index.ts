export type AdaptationLevel = 'beginner' | 'intermediate' | 'advanced';

export interface PassageResponse {
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

export interface DialoguesResponse {
  success: boolean;
  data?: {
    dialogues: string[];
    count: number;
  };
}
