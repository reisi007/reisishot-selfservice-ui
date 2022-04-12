// The order here is used for sorting as well :)
import {ChartDataset, ChartOptions, ChartType, TooltipItem} from 'chart.js';

export const OVERRIDES: { [name: string]: { color: string, expectedPercentage: number } } = {
  'Porträt Shooting': {color: '#0031d1', expectedPercentage: 30},
  'Tanz / Yoga Shooting': {color: '#1e90ff', expectedPercentage: 15},
  'Sport Shooting': {color: '#6bb6ff', expectedPercentage: 5},
  'Boudoir Shooting': {color: '#daa520', expectedPercentage: 25},
  'Pärchen Shooting': {color: '#ff69b4', expectedPercentage: 15},
  'Hochzeit Shooting': {color: '#d3d3d3', expectedPercentage: 0},
  'Haustier Shooting': {color: '#ff6200', expectedPercentage: 10},
};


export type TypedTooltipItem<Type extends ChartType, RAW> = TooltipItem<Type> & { raw: RAW }

// https://stackoverflow.com/a/13532993/1870799
export function shadeColor(color: string, percent: number) {

  let r = parseInt(color.substring(1, 3), 16);
  let g = parseInt(color.substring(3, 5), 16);
  let b = parseInt(color.substring(5, 7), 16);

  r = Math.round(r * (100 + percent) / 100);
  g = Math.round(g * (100 + percent) / 100);
  b = Math.round(b * (100 + percent) / 100);

  r = (r < 255) ? r : 255;
  g = (g < 255) ? g : 255;
  b = (b < 255) ? b : 255;

  const RR = ((r.toString(16).length == 1) ? '0' + r.toString(16) : r.toString(16));
  const GG = ((g.toString(16).length == 1) ? '0' + g.toString(16) : g.toString(16));
  const BB = ((b.toString(16).length == 1) ? '0' + b.toString(16) : b.toString(16));

  return '#' + RR + GG + BB;
}

export type ChartConfig<Type extends ChartType> = {
  title: string,
  options: ChartOptions<Type>,
  labels: string[],
  chartType: Type,
  chartLegend: boolean
  dataSet: ChartDataset<Type, number[]>[]
}


export const SHARED_OPTIONS: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};
