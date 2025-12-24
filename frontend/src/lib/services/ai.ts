import { api } from './api';
import type { AiDemoRequest, AiDemoResponse } from '$lib/types/api.types';

/**
 * AI service for interacting with AI endpoints
 */
export const aiService = {
	/**
	 * Send a prompt to the AI demo endpoint
	 */
	async sendPrompt(prompt: string): Promise<AiDemoResponse> {
		const requestData: AiDemoRequest = { prompt };

		const response = await api.post<AiDemoResponse>('/ai/demo', requestData);

		return response;
	}
};
