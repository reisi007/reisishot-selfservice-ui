import {Person} from '../../contract/api/createContract';

export interface WaitlistPerson extends Person {
  secret: string;
  availability: string;
  phone_number: string;
  website: string | null;
}

export interface WaitlistRecord extends WaitlistPerson {
  item_id: number;
  text: string | null;
}

export interface WaitlistItem {
  id: number;
  short: string;
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
): WaitlistRecord {
  const record = waitlistPerson as WaitlistRecord;
  record.item_id = itemId;
  record.text = text;
  return record;
}
