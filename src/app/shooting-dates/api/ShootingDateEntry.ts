export type ShootingDateEntry = {
  kw: number,
  state: ShootingSlotState,
  text?: string
}

export enum ShootingSlotState {
  FREE = 'FREE',
  BUSY = 'BUSY',
  TAKEN = 'TAKEN',
  BLOCKED = 'BLOCKED',
}
