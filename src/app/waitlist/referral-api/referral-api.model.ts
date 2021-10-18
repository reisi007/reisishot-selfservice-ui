export interface ReferralInfo {
  email: string;
  action: ReferralType;
}

export enum ReferralType {
  REGISTER = 'waitlist_register',
  SHOOTING_GOOD = 'shooting_good',
  SHOOTING_BAD = 'shooting_bad'
}

export interface Referrable {
  referrer?: string;
}

export interface Perk {
  id: string;
  display: string;
  value: number;
}
