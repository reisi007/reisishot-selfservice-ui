import {FormControl, ValidationErrors} from '@angular/forms';
import * as dayjs from 'dayjs';

export function beforeNow(fc: FormControl): ValidationErrors {
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

export function afterNow(fc: FormControl): ValidationErrors {
  const parsedDate = dayjs(fc.value);
  const cur = dayjs();
  if (cur.isBefore(parsedDate)) {
    return null;
  }
  return {
    dayAfter: {
      is: parsedDate,
      min: cur,
    },
  };
}
