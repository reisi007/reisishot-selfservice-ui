export type ShootingStatisticsResponse = {
  [year: string]: {
    [shootingType: string]: number // number of shootings of this type in this year
  }
}
