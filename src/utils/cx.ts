const cx = (...args: any[]) =>
  args.filter((arg) => typeof arg === 'number' || Boolean(arg)).join(' ');

export default cx;
