import * as dayjs from 'dayjs';
import {calculateAge} from './datetime.formatter';

describe('Datetime Utils', () => {

  describe('calculateAge', () => {
    const DATE_FORMAT = 'YYYY-mm-dd';

    it('age is never rounded up', () => {
      const begin = dayjs();
      const end = begin.add(18, 'years').add(-1, 'second');

      const age = calculateAge(begin.format(DATE_FORMAT), end.format(DATE_FORMAT));

      expect(age).toEqual('17.99');
    });
  });
});
