import type { GetParams, ResponseData } from './api';
import toQueryString from './toQueryString';

const failData: ResponseData<undefined> = {
  data: undefined,
  error_code: -9999,
  error_message: 'Fetch error',
};

const getJson = async <T = any>({
  domain = process.env.REACT_APP_API_DOMAIN ?? '',
  path = '',
  success,
  fail,
  finished,
  query,
  manualQuery = '',
}: GetParams<T>): Promise<T | undefined> => {
  try {
    const resp = await fetch(
      `${domain}${path}${query ? `?${toQueryString(query)}` : ''}${manualQuery}`
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

export default getJson;
