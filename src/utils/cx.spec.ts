import cx from './cx';

describe('utils/cx', () => {
  it('should correctly join css classes', () => {
    // eslint-disable-next-line no-constant-condition
    const classes = cx('test', true && 'take', false && 'ignore', true ? 'foo' : 'bar');
    expect(classes).toBe('test take foo');
  });
});
