import * as dayjs from 'dayjs';
import {calculateAge, TEMPLATE_DATE} from './datetime.formatter';

describe('Datetime Utils', () => {

  describe('calculateAge', () => {
    it('age is never rounded up', () => {
      const begin = dayjs().startOf('day');
      const end = begin.add(18, 'years').add(-1, 'second');

      const age = calculateAge(
        begin.format(TEMPLATE_DATE),
        end.format(TEMPLATE_DATE),
      );

      expect(age).toEqual('17.99');
    });
  });
});
