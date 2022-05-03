import * as dayjs from 'dayjs';
import {calculateAge} from './datetime.formatter';

describe('Datetime Utils', () => {

  describe('calculateAge', () => {
    const DATE_FORMAT = 'YYYY-MM-DD';

    it('age is never rounded up', () => {
      const begin = dayjs().startOf('day');
      const end = begin.add(18, 'years').add(-1, 'second');

      let startDate = begin.format(DATE_FORMAT);
      let endDate = end.format(DATE_FORMAT);
      const age = calculateAge(startDate, endDate);

      expect(age).toEqual('17.99');
    });
  });
});
