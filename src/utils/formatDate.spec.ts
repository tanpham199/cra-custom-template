import formatDate from './formatDate';

describe('utils/formatDate', () => {
  it('should correctly format date string or number', () => {
    expect(formatDate()).toBe('');
    expect(formatDate(undefined)).toBe('');
    expect(formatDate(1669620413128)).toBe('28/11/2022');
    expect(formatDate('Nov 28 2022')).toBe('28/11/2022');
  });
});
