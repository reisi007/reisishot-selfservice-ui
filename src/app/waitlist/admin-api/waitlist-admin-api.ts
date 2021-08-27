import {WaitlistItem, WaitlistRecord} from '../api/waitlist-api';

export interface WaitlistItemWithRegistrations extends WaitlistItem {
  registrations: Array<WaitlistRecord>;
}
