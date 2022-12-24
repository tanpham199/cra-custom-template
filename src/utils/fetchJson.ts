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

export const createApiEndpoint = (domain?: string | null, path?: string | null) => {
  const _domain = domain ?? '';
  const _path = path ?? '';
  if (_domain + _path === '') {
    return '/';
  }
  const domainHasSlash = _domain.endsWith('/');
  const pathHasSlash = _path.startsWith('/');
  if (domainHasSlash && pathHasSlash) {
    return `${_domain.slice(0, -1)}${_path}`;
  }
  if (!domainHasSlash && !pathHasSlash) {
    return `${_domain}/${_path}`;
  }
  return `${_domain}${_path}`;
};

interface FetchParams<T> {
  domain?: string;
  path?: string;
  query?: Record<string, any>;
  method?: Method;
  body?: Record<string, any>;
  success?: (data: T) => void;
  fail?: (data: ResponseData<T | undefined>) => void;
  finished?: () => void;
}

const fetchJson = async <T = any>({
  domain = process.env.REACT_APP_API_DOMAIN,
  path,
  query,
  method,
  body,
  success,
  fail,
  finished,
}: FetchParams<T>): Promise<T | undefined> => {
  try {
    const resp = await fetch(
      `${createApiEndpoint(domain, path)}${query ? `?${toQueryString(query)}` : ''}`,
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
