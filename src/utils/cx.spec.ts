import cx from './cx';

describe('utils/cx', () => {
  it('should correctly join css classes', () => {
    const classes = cx(
      'test',
      '',
      true && 'take',
      false && 'ignore',
      // eslint-disable-next-line no-constant-condition
      true ? 'foo' : 'bar',
      0,
      '0',
      1,
      '1',
      null,
      undefined
    );
    expect(classes).toBe('test take foo 0 0 1 1');
  });
});
