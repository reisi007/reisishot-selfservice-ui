import * as dayjs from 'dayjs';

export interface ReferralInfo {
  email: string;
  action: ReferralType;
}

export enum ReferralType {
  REGISTER = 'waitlist_register',
  SHOOTING_GOOD = 'shooting_good',
  SHOOTING_REFERRED_GOOD = 'shooting_referred_good',
  SHOOTING_BAD = 'shooting_bad',
  SHOOTING_REFERRED_BAD = 'shooting_referred_bad'
}

export interface Referrable {
  referrer?: string;
}

export interface Perk {
  id: string;
  display: string;
  value: number;
}

export interface ReferralPointEntry {
  points: number;
  display: string;
  timestamp: dayjs.Dayjs;
}
