const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export async function fetchApi<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
  const query = params ? '?' + new URLSearchParams(params).toString() : '';
  const res = await fetch(`${API_URL}${endpoint}${query}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return null as T;
  return res.json();
}
