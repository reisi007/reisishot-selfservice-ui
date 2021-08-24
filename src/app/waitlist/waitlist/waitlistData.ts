import {Person} from '../../contract/api/createContract';

export interface WaitlistPerson extends Person {
  secret: string;
  availability: string;
  phone_number: string;
  website: string | null;
}

export interface WaitlistRecord extends WaitlistPerson {
  itemId: string;
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
  max_waiting: number;
  registered: '0' | '1';
}
