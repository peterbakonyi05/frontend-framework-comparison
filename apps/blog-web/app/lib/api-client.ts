const API_BASE_URL = process.env['NX_BLOG_API_BASE_URL'];

export const apiClient = {
  async getData<T>(url: string): Promise<T> {
    console.log({ API_BASE_URL, url });
    const response = await fetch(new URL(url, API_BASE_URL).toString());
    return response.json();
  },
};
