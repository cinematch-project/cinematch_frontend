type ApiOptions<TData> = RequestInit & {
  body?: TData;
};

export async function api<TResponse, TData = void>(
  url: string,
  options: ApiOptions<TData> = {},
): Promise<TResponse> {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const fullUrl = new URL(url, BASE_URL).href;

  const headers = new Headers(options.headers);
  if (!headers.has("Content-Type")) headers.set("Content-Type", "application/json");

  const fullOptions = {
    ...options,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  };

  const result = await fetch(fullUrl, fullOptions);
  return await result.json();
}
