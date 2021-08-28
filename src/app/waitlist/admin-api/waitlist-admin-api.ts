import {WaitlistItem, WaitlistRecord} from '../api/waitlist-api';

export interface WaitlistItemWithRegistrations extends WaitlistItem {
  registrations: Array<AdminWaitlistRecord>;
}

export interface AdminWaitlistRecord extends WaitlistRecord {
  done_internal: '0' | '1';
}
