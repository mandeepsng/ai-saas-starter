import { redirect } from '@sveltejs/kit';
import { api } from '$lib/services/api';

export const load = async () => {
  try {
    await api.get('/me');
  } catch {
    throw redirect(302, '/login');
  }
};
