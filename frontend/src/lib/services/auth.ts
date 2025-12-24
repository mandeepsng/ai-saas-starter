import { goto } from '$app/navigation';
import { api, tokenManager } from './api';
import { userStore } from '$lib/stores/auth.store';
import type {
	LoginRequest,
	LoginResponse,
	RegisterRequest,
	RegisterResponse,
	MeResponse
} from '$lib/types/api.types';

/**
 * Authentication service
 */
export const authService = {
	/**
	 * Register a new user
	 */
	async register(data: RegisterRequest): Promise<RegisterResponse> {
		const response = await api.post<RegisterResponse>('/register', data, false);

		// Store token and user data
		if (response.success && response.data.token) {
			tokenManager.set(response.data.token);
			userStore.setUser(response.data.user);
		}

		return response;
	},

	/**
	 * Login user
	 */
	async login(data: LoginRequest): Promise<LoginResponse> {
		const response = await api.post<LoginResponse>('/login', data, false);

		// Store token and user data
		if (response.success && response.data.token) {
			tokenManager.set(response.data.token);
			userStore.setUser(response.data.user);
		}

		return response;
	},

	/**
	 * Logout user
	 */
	async logout(): Promise<void> {
		try {
			// Call backend to revoke token
			await api.post('/logout');
		} catch (error) {
			// Continue with client-side logout even if API fails
			console.error('Logout API error:', error);
		} finally {
			// Clear local state regardless of API response
			tokenManager.remove();
			userStore.clearUser();
			goto('/login');
		}
	},

	/**
	 * Get current authenticated user
	 */
	async getMe(): Promise<MeResponse> {
		const response = await api.get<MeResponse>('/me');

		// Update user store with fresh data
		if (response.success && response.data.user) {
			userStore.setUser(response.data.user);
		}

		return response;
	},

	/**
	 * Check if user is authenticated
	 */
	isAuthenticated(): boolean {
		return tokenManager.exists();
	},

	/**
	 * Get stored token
	 */
	getToken(): string | null {
		return tokenManager.get();
	},

	/**
	 * Set token manually (use with caution)
	 */
	setToken(token: string): void {
		tokenManager.set(token);
	},

	/**
	 * Clear token and user data
	 */
	clearAuth(): void {
		tokenManager.remove();
		userStore.clearUser();
	}
};
