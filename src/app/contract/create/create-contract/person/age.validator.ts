import {FormControl, ValidationErrors} from '@angular/forms';
import * as dayjs from 'dayjs';

export function beforeToday(fc: FormControl): ValidationErrors {
  const parsedDate = dayjs(fc.value);
  const cur = dayjs();
  if (cur.isAfter(parsedDate)) {
    return null;
  }
  return {
    dayBefore: {
      is: parsedDate,
      max: cur,
    },
  };
}
