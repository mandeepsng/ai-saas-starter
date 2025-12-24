const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = {
  async get(path: string) {
    const res = await fetch(`${BASE_URL}${path}`, {
      credentials: 'include'
    });
    if (!res.ok) throw new Error('Unauthorized');
    return res.json();
  },

  async post(path: string, data: any) {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Request failed');
    return res.json();
  }
};
