import {Person} from '../../contract/api/createContract';

export interface WaitlistPerson extends Person {
  secret: string;
  availability: string;
  phone_number: string;
  website: string | null;
}

export interface WaitlistRecord extends WaitlistPerson {
  itemId: number;
  text: string | null;
  done_customer: '0' | '1';
  done_internal: '0' | '1';
}

export interface WaitlistItem {
  id: number;
  image_id: string;
  title: string;
  description: string;
  available_from: string;
  available_to: string;
  max_waiting: string | null; // Is a number
  registered: '0' | '1';
}

export function convertPerson2Record(
  waitlistPerson: WaitlistPerson,
  itemId: number,
  text: string,
  doneCustomer: '0' | '1' = '0',
  doneInternal: '0' | '1' = '0',
): WaitlistRecord {
  const record = waitlistPerson as WaitlistRecord;
  record.itemId = itemId;
  record.text = text;
  record.done_customer = doneCustomer;
  record.done_internal = doneInternal;
  return record;
}
