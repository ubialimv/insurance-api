import deduct from '../deduct.operation';

describe('deduct operation', () => {
  it('given a call to deduct operation should return the result of deducting right from left', () => {
    expect(deduct(1, 1)).toBe(0);
  });
});
