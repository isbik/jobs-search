const FETCH_BASE: string = "http://localhost:5173/api";

export type RequestConfig<TVariables = unknown> = {
  method: "get" | "put" | "patch" | "post" | "delete";
  url: string;
  params?: Record<string, string | number | boolean | null>;
  data?: TVariables;
  responseType?: "arraybuffer" | "blob" | "json" | "text";
  signal?: AbortSignal;
  headers?: HeadersInit;
};

export type ResponseConfig<TData = unknown> = {
  data: TData;
  status: number;
  statusText: string;
  headers?: HeadersInit;
};

export const fetchClient = async <TData, TError = unknown, TVariables = unknown>(
  config: RequestConfig<TVariables>,
): Promise<ResponseConfig<TData>> => {
  const { url, params, data, responseType = "json", signal, headers } = config;
  const method = (config.method || "GET").toUpperCase();

  const fullUrl = new URL(
    "api" + url,
    typeof FETCH_BASE !== "undefined" ? FETCH_BASE : undefined,
  );

  // Attach URL parameters if provided
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined) {
        return;
      }
      return fullUrl.searchParams.append(key, String(value));
    });
  }

  const fetchHeaders = new Headers(headers);

  // Fetch options
  const fetchOptions: RequestInit = {
    method,
    headers: fetchHeaders,
    signal,
    credentials: "include",
  };

  // Attach data for applicable methods
  if (data && ["POST", "PUT", "PATCH"].includes(method)) {
    fetchOptions.body = JSON.stringify(data);
    fetchHeaders.set("Content-Type", "application/json");
  }

  const response = await fetch(fullUrl.toString(), fetchOptions);

  // Handle response
  if (!response.ok) {
    const errorData = (await response.json().catch(() => ({}))) as TError;
    throw errorData;
  }

  const parseResponse = {
    arraybuffer: () => response.arrayBuffer(),
    blob: () => response.blob(),
    text: () => response.text(),
    json: () => response.json(),
  };

  return {
    data: (await parseResponse[responseType]()) as TData,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  };
};

export default fetchClient;
