export interface ReferralInfo {
  email: string;
  type: ReferralType;
}

export enum ReferralType {
  REGISTER = 'waitlist_register',
  SHOOTING_GOOD = 'shooting_good',
  SHOOTING_BAD = 'shooting_bad'
}
