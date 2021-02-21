import {PrettyFilenamePipe} from './pretty-filename.pipe';

describe('PrettyFilenamePipe', () => {
  it('create an instance', () => {
    const pipe = new PrettyFilenamePipe();
    expect(pipe).toBeTruthy();
  });
});
