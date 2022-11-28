import safeArr from './safeArr';

describe('utils/safeArr', () => {
  it('should always return an array and maintain data if the original input is an array', () => {
    expect(safeArr()).toEqual([]);
    expect(safeArr(null as any)).toEqual([]);
    expect(safeArr(1 as any)).toEqual([]);
    expect(safeArr('a' as any)).toEqual([]);
    expect(safeArr([])).toEqual([]);
    expect(safeArr([1, 2, 3])).toEqual([1, 2, 3]);
    expect(safeArr(['a', 'b', 'c'])).toEqual(['a', 'b', 'c']);
    expect(safeArr([{ a: 1 }, { b: 2 }, { c: 3 }])).toEqual([{ a: 1 }, { b: 2 }, { c: 3 }]);
  });
});
