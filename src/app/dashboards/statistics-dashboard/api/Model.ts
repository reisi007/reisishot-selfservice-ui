export type ShootingStatisticsResponsePerYear = {
  [year: string]: {
    [shootingType: string]: number // number of shootings of this type in this year
  }
}

export type ShootingStatisticsResponsePerMonth = {
  [month: string]: {
    [shootingType: string]: number
  }
}
