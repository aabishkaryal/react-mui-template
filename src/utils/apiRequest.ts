import makeApiUrl from "./makeUrl";

type params = {
  path: string;
  method?: string;
  body?: unknown;
  token?: string;
  abortSignal?: AbortSignal;
};

const apiPort = import.meta.env.VITE_API_PORT;

export async function apiRequest<T>({
  path,
  method = "POST",
  body,
  token,
  abortSignal,
}: params) {
  type ApiResponse = {
    status: number;
    data: T | null;
    error: string;
  };
  try {
    const headers = new Headers();
    headers.set("Content-Type", "application/json");

    if (token) {
      headers.set("Authorization", "Bearer " + token);
    }

    const requestInfo: RequestInit = {
      method: method,
      headers: headers,
      signal: abortSignal,
      cache: "no-cache",
    };
    if (body) {
      requestInfo.body = JSON.stringify(body);
    }

    const rsp = await fetch(makeApiUrl(apiPort, path), requestInfo);
    switch (rsp.status) {
      case 200:
        if (rsp.body) {
          const text = await rsp.text();
          if (text !== "") {
            const data = JSON.parse(text) as T;
            return { data: data, status: rsp.status, error: "" } as ApiResponse;
          } else {
            return { data: null, status: rsp.status, error: "" } as ApiResponse;
          }
        } else {
          return { data: null, status: rsp.status, error: "" } as ApiResponse;
        }
      case 401:
        return {
          data: null,
          status: rsp.status,
          error: rsp.statusText,
        } as ApiResponse;
      default:
        return {
          data: null,
          status: rsp.status,
          error: rsp.statusText,
        } as ApiResponse;
    }
  } catch (err) {
    console.error(err);
    return { data: null, status: 0, error: `${err}` } as ApiResponse;
  }
}
