export interface ResponseData<T> {
  data: T;
  error_message: string;
  error_code: number;
}

export interface GetParams<T> {
  domain?: string;
  path?: string;
  query?: Record<string, any>;
  manualQuery?: string;
  success?: (data: T) => void;
  fail?: (data: ResponseData<T | undefined>) => void;
  finished?: () => void;
}

export interface PostParams<T> extends GetParams<T> {
  body: Record<string, any>;
}
