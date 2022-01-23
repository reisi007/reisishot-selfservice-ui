import {WaitlistItem, WaitlistPerson, WaitlistRecord} from '../../waitlist/api/waitlist-api';

export interface WaitlistItemWithRegistrations extends WaitlistItem {
  registrations: Array<AdminWaitlistRecord>;
}

export interface AdminWaitlistRecord extends WaitlistRecord, WaitlistPerson {
  done_internal: '0' | '1';
  points: number;
  person_id: number;
}

export interface WaitlistAdminData {
  registrations: Array<WaitlistItemWithRegistrations>,
  leaderboard: Array<LeaderboardEntry>
}

export interface LeaderboardEntry {
  position: number | undefined;
  referrer: string;
  points: number;
}

export interface PendingSignaturInformation {
  email: string,
  access_key: string,
  due_date: string
}
