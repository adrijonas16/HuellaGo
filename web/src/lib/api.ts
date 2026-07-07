const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export async function fetchApi<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
  try {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    const fetchOptions: RequestInit = typeof window === 'undefined'
      ? { next: { revalidate: 60 } } as any
      : {};
    const res = await fetch(`${API_URL}${endpoint}${query}`, fetchOptions);
    if (!res.ok) return null as T;
    return res.json();
  } catch {
    return null as T;
  }
}
