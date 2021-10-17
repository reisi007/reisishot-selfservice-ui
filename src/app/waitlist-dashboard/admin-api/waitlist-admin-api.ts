import {WaitlistItem, WaitlistPerson, WaitlistRecord} from '../../waitlist/api/waitlist-api';

export interface WaitlistItemWithRegistrations extends WaitlistItem {
  registrations: Array<AdminWaitlistRecord>;
}

export interface AdminWaitlistRecord extends WaitlistRecord, WaitlistPerson {
  done_internal: '0' | '1';
  points: number;
}
