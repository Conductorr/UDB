export async function fetcher<T>(
  url: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const requestInit: RequestInit = {
    method: init?.method ?? "GET",
    headers: { "Content-Type": "application/json", ...init?.headers },
    cache: "no-store",
    ...init,
  };

  const response = await fetch(url, requestInit);
  const { ok } = response;

  if (!ok) {
    throw new Error("An error occurred while fetching the data.");
  }

  return response.json();
}
