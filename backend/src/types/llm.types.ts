export interface LLMProvider {
    type?: string;
    apiKey?: string; 
    adaptationPrompt?: string;
    readonly apiBaseUrl: string;
    readonly model: string;
}