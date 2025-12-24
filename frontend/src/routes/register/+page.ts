// src/routes/register/+page.ts
import { redirect } from '@sveltejs/kit';

export const load = async ({ fetch }) => {
	const res = await fetch('/api/me');

	if (res.ok) {
		throw redirect(302, '/app/dashboard');
	}

	return {};
};
