// src/routes/+page.ts
import { redirect } from '@sveltejs/kit';

export const load = async ({ fetch }) => {
	try {
		// Check auth from backend
		const res = await fetch('/api/me');

		if (res.ok) {
			// User is logged in
			throw redirect(302, '/app/dashboard');
		}
	} catch {
		// Ignore errors → treat as logged out
	}

	// Not logged in
	throw redirect(302, '/login');
};
