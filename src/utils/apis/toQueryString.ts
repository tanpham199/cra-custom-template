const toQueryString = (object: Record<string, any>) => new URLSearchParams(object).toString();

export default toQueryString;
