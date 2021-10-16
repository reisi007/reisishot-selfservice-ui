import {Person} from '../../contract/api/createContract';
import {Referrable} from '../referral-api/referral-api.model';

export interface WaitlistPerson extends Person, Referrable {
  availability: string;
  phone_number: string;
  website: string | null;
}

export interface WaitlistRecord {
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

export interface Userdata {
  email: string;
  access_key: string;
}
