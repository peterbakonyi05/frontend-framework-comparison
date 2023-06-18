const API_BASE_URL = process.env['NX_BLOG_API_BASE_URL'];

const getUrl = (path: string): string => new URL(path, API_BASE_URL).toString();

export const apiClient = {
  async getData<T>(path: string): Promise<T> {
    const response = await fetch(getUrl(path));
    return response.json();
  },

  async post<T>(path: string, body?: unknown): Promise<T> {
    const response = await fetch(getUrl(path), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: typeof body !== 'undefined' ? JSON.stringify(body) : undefined,
    });
    return response.json();
  },
};
