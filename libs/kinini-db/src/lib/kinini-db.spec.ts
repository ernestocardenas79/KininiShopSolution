import {kininiDb} from './kinini-db';

describe('kininiDb', () => {
  it('should work', () => {
    expect(new kininiDb()).toEqual('kinini-db');
  });
});
