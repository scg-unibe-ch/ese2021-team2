import { filterPipe } from './filter.pipe';

describe('filterPipe', () => {
  it('create an instance', () => {
    const pipe = new filterPipe();
    expect(pipe).toBeTruthy();
  });
});
