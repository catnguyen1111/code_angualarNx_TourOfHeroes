import { guard } from './guard';

describe('guard', () => {
  it('should work', () => {
    expect(guard()).toEqual('guard');
  });
});
