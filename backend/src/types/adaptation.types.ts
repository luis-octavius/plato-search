/**
 * Types for text adaptation levels and requests/responses
 */

export type AdaptationLevel = 'beginner' | 'intermediate' | 'advanced';

export interface PassageReference {
  dialogue: string;
  stephanus: string;
}

export interface PassageContent {
  reference: string;
  greek: string;
  english: string;
}

export interface AdaptationRequest {
  text: string;
  level: AdaptationLevel;
}

export interface AdaptationResponse {
  adapted: string;
}

export interface PassageWithAdaptations extends PassageContent {
  adaptations: {
    beginner: string;
    intermediate: string;
    advanced: string;
  };
}
