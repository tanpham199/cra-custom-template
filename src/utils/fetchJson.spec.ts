import { createApiEndpoint } from './fetchJson';

describe('fetchJson/createApiEndpoint', () => {
  it('should correctly create a valid API Endpoint from domain and path', () => {
    const domain = 'https://test.com';
    const path = 'my-path';
    const expectedResult = 'https://test.com/my-path';

    expect(createApiEndpoint()).toBe('/');
    expect(createApiEndpoint(null, null)).toBe('/');
    expect(createApiEndpoint(domain, path)).toBe(expectedResult);
    expect(createApiEndpoint(`${domain}/`, `/${path}`)).toBe(expectedResult);
    expect(createApiEndpoint(`${domain}/`, path)).toBe(expectedResult);
    expect(createApiEndpoint(domain, `/${path}`)).toBe(expectedResult);
  });
});
