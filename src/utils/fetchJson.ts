interface ResponseData<T> {
  data: T;
  error_message: string;
  error_code: number;
}

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

const failData: ResponseData<undefined> = {
  data: undefined,
  error_code: -9999,
  error_message: 'Fetch error',
};

const toQueryString = (object: Record<string, any>) => new URLSearchParams(object).toString();

interface FetchParams<T> {
  domain?: string;
  path?: string;
  query?: Record<string, any>;
  manualQuery?: string;
  method?: Method;
  body?: Record<string, any>;
  success?: (data: T) => void;
  fail?: (data: ResponseData<T | undefined>) => void;
  finished?: () => void;
}

const fetchJson = async <T = any>({
  domain = process.env.REACT_APP_API_DOMAIN ?? '',
  path = '',
  success,
  fail,
  finished,
  query,
  manualQuery = '',
  method,
  body,
}: FetchParams<T>): Promise<T | undefined> => {
  try {
    const resp = await fetch(
      `${domain}${path}${query ? `?${toQueryString(query)}` : ''}${manualQuery}`,
      {
        method,
        body: body ? new URLSearchParams(body) : undefined,
      }
    );
    const data = (await resp.json()) as ResponseData<T>;
    if (data.error_code >= 0) {
      success?.(data.data);
    } else {
      fail?.(data);
    }
    return data.error_code >= 0 ? data.data : undefined;
  } catch (ex) {
    fail?.(failData);
    return undefined;
  } finally {
    finished?.();
  }
};

export default fetchJson;
