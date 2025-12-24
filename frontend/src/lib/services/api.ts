import { goto } from '$app/navigation';
import type { ApiError } from '$lib/types/api.types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const TOKEN_KEY = 'auth_token';

// Token management
export const tokenManager = {
	get(): string | null {
		if (typeof window === 'undefined') return null;
		return localStorage.getItem(TOKEN_KEY);
	},

	set(token: string): void {
		if (typeof window === 'undefined') return;
		localStorage.setItem(TOKEN_KEY, token);
	},

	remove(): void {
		if (typeof window === 'undefined') return;
		localStorage.removeItem(TOKEN_KEY);
	},

	exists(): boolean {
		return this.get() !== null;
	}
};

// API error class
export class ApiRequestError extends Error {
	constructor(
		message: string,
		public status: number,
		public errors?: Record<string, string[]>
	) {
		super(message);
		this.name = 'ApiRequestError';
	}
}

// Helper to build headers
function getHeaders(includeAuth: boolean = true): HeadersInit {
	const headers: HeadersInit = {
		'Content-Type': 'application/json',
		Accept: 'application/json'
	};

	if (includeAuth) {
		const token = tokenManager.get();
		if (token) {
			headers['Authorization'] = `Bearer ${token}`;
		}
	}

	return headers;
}

// Helper to handle response
async function handleResponse<T>(response: Response): Promise<T> {
	const contentType = response.headers.get('content-type');
	const isJson = contentType?.includes('application/json');

	if (!response.ok) {
		// Handle 401 Unauthorized - clear token and redirect to login
		if (response.status === 401) {
			tokenManager.remove();
			if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
				goto('/login');
			}
		}

		// Try to parse error response
		if (isJson) {
			const errorData: ApiError = await response.json();
			throw new ApiRequestError(errorData.message, response.status, errorData.errors);
		}

		// Fallback error
		throw new ApiRequestError(
			`Request failed with status ${response.status}`,
			response.status
		);
	}

	// Parse successful response
	if (isJson) {
		return response.json();
	}

	return {} as T;
}

// Main API client
export const api = {
	/**
	 * GET request
	 */
	async get<T = any>(path: string, includeAuth: boolean = true): Promise<T> {
		const response = await fetch(`${BASE_URL}${path}`, {
			method: 'GET',
			headers: getHeaders(includeAuth)
		});

		return handleResponse<T>(response);
	},

	/**
	 * POST request
	 */
	async post<T = any>(path: string, data?: any, includeAuth: boolean = true): Promise<T> {
		const response = await fetch(`${BASE_URL}${path}`, {
			method: 'POST',
			headers: getHeaders(includeAuth),
			body: data ? JSON.stringify(data) : undefined
		});

		return handleResponse<T>(response);
	},

	/**
	 * PUT request
	 */
	async put<T = any>(path: string, data?: any, includeAuth: boolean = true): Promise<T> {
		const response = await fetch(`${BASE_URL}${path}`, {
			method: 'PUT',
			headers: getHeaders(includeAuth),
			body: data ? JSON.stringify(data) : undefined
		});

		return handleResponse<T>(response);
	},

	/**
	 * PATCH request
	 */
	async patch<T = any>(path: string, data?: any, includeAuth: boolean = true): Promise<T> {
		const response = await fetch(`${BASE_URL}${path}`, {
			method: 'PATCH',
			headers: getHeaders(includeAuth),
			body: data ? JSON.stringify(data) : undefined
		});

		return handleResponse<T>(response);
	},

	/**
	 * DELETE request
	 */
	async delete<T = any>(path: string, includeAuth: boolean = true): Promise<T> {
		const response = await fetch(`${BASE_URL}${path}`, {
			method: 'DELETE',
			headers: getHeaders(includeAuth)
		});

		return handleResponse<T>(response);
	}
};
