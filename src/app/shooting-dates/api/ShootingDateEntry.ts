export type ShootingDateEntry = {
  kw: number,
  isShooting: boolean
}

export type ShootingDateDisplayEntry = { kw: number; color: Color }

export enum Color {
  GREEN = 'green',
  YELLOW = 'yellow',
  ORANGE = 'orange',
  RED = 'red'
}
