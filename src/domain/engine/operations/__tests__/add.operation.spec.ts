import add from '../add.operation';

describe('add operation', () => {
  it('given a call to add operation should return the sum of left and right', () => {
    expect(add(1, 1)).toBe(2);
  });
});
