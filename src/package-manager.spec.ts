import glob from 'glob';

describe('Package manager', () => {
  it('should be yarn, not npm', (done) => {
    glob('**/package-lock.json', {}, (err, files) => {
      if (err != null) {
        console.error('Error occurred when trying to find package-lock.json');
      }
      done();
      expect(files.length).toBe(0);
    });
  });
});
