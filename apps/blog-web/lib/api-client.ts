import fetch from 'cross-fetch';

const API_BASE_URL = process.env.NX_BLOG_API_BASE_URL;

const getUrl = (path: string): string =>
  API_BASE_URL ? new URL(path, API_BASE_URL).toString() : path;

export const apiClient = {
  async get(path: string): Promise<Response> {
    const url = getUrl(path);
    const response = await fetch(url);
    return response.ok ? response : Promise.reject(response);
  },

  async getData<T>(path: string): Promise<T> {
    const response = await apiClient.get(path);
    return response.json();
  },

  async post(path: string, body?: unknown): Promise<Response> {
    const response = await fetch(getUrl(path), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: typeof body !== 'undefined' ? JSON.stringify(body) : undefined,
    });
    return response.ok ? response : Promise.reject(response);
  },
};
