import { writable, derived, type Writable } from 'svelte/store';
import type { User } from '$lib/types/api.types';

// Auth state interface
interface AuthState {
	user: User | null;
	isLoading: boolean;
	error: string | null;
}

// Initial state
const initialState: AuthState = {
	user: null,
	isLoading: false,
	error: null
};

// Create the main auth store
function createAuthStore() {
	const { subscribe, set, update }: Writable<AuthState> = writable<AuthState>(initialState);

	return {
		subscribe,

		// Set user data
		setUser: (user: User) => {
			update((state) => ({
				...state,
				user,
				error: null
			}));
		},

		// Clear user data
		clearUser: () => {
			set(initialState);
		},

		// Set loading state
		setLoading: (isLoading: boolean) => {
			update((state) => ({
				...state,
				isLoading
			}));
		},

		// Set error
		setError: (error: string | null) => {
			update((state) => ({
				...state,
				error,
				isLoading: false
			}));
		},

		// Reset error
		clearError: () => {
			update((state) => ({
				...state,
				error: null
			}));
		},

		// Reset entire store
		reset: () => {
			set(initialState);
		}
	};
}

// Export the store
export const userStore = createAuthStore();

// Derived stores for convenience
export const user = derived(userStore, ($auth) => $auth.user);
export const isAuthenticated = derived(userStore, ($auth) => $auth.user !== null);
export const isLoading = derived(userStore, ($auth) => $auth.isLoading);
export const authError = derived(userStore, ($auth) => $auth.error);
export const userName = derived(userStore, ($auth) => $auth.user?.name ?? '');
