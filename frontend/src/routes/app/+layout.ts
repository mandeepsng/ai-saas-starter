import { redirect } from '@sveltejs/kit';
import { authService } from '$lib/services/auth';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
	// Check if user is authenticated
	if (!authService.isAuthenticated()) {
		throw redirect(302, '/login');
	}

	try {
		// Fetch current user data
		const response = await authService.getMe();

		return {
			user: response.data.user
		};
	} catch (error) {
		// If token is invalid or expired, redirect to login
		throw redirect(302, '/login');
	}
};
