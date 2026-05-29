import { PassageResponse, DialoguesResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * API client for PlatoSearch backend
 */
export class ApiClient {
  /**
   * Search for a passage by dialogue and Stephanus reference
   */
  static async searchPassage(
    dialogue: string,
    stephanus: string
  ): Promise<PassageResponse> {
    try {
      const params = new URLSearchParams({
        dialogue,
        stephanus,
      });

      const response = await fetch(
        `${API_BASE_URL}/passages/search?${params.toString()}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json() as { error?: string };
        throw new Error(
          errorData.error || `HTTP ${response.status}: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        return {
          success: false,
          error: `Failed to search passage: ${error.message}`,
        };
      }
      return {
        success: false,
        error: 'An unknown error occurred while searching',
      };
    }
  }

  /**
   * Fetch list of available dialogues
   */
  static async getAvailableDialogues(): Promise<DialoguesResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/passages/dialogues`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json() as { error?: string };
        throw new Error(
          errorData.error || `HTTP ${response.status}: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        return {
          success: false,
          error: `Failed to fetch dialogues: ${error.message}`,
        };
      }
      return {
        success: false,
        error: 'An unknown error occurred while fetching dialogues',
      };
    }
  }
}
