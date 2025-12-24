// src/routes/login/+page.ts
import { redirect } from '@sveltejs/kit';

export const load = async ({ fetch }) => {
	// If already logged in → go to dashboard
	const res = await fetch('/api/me');

	if (res.ok) {
		throw redirect(302, '/app/dashboard');
	}

	return {};
};
