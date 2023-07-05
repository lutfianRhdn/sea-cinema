export default async function fetchData(
  path: string,
  method: string,
  body?: any,
  token?: string
) {
  const headers: any = {
    'Content-Type': 'application/json',
  };
  if (token) headers['authorization'] = `Bearer ${token}`;
  const config: any = {
    method,
    cache: 'no-cache',
    headers,
    body: JSON.stringify(body),
  };
  if (method === 'GET') delete config.body;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${path}`, {
    ...config,
  });

  const data = await res.json();
  return data;
}
