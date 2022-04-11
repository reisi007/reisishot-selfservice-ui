import {Component, OnInit} from '@angular/core';
import {ShootingStatisticApiService} from '../api/shooting-statistic-api.service';
import {ChartDataset, ChartOptions, ChartType, TooltipItem} from 'chart.js';
import {ShootingStatisticsResponse} from '../../review-dashboard/api/Model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AdminLoginService} from '../../../dashboard/login/admin-login.service';

@Component({
  selector: 'app-statistic-per-year',
  templateUrl: './statistic-per-year.component.html',
  styleUrls: ['./statistic-per-year.component.scss'],
})
export class StatisticPerYearComponent implements OnInit {

  // The order here is used for sorting as well :)
  public static readonly overrides: { [name: string]: { color: string, expectedPercentage: number } } = {
    'Porträt Shooting': {color: '#0031d1', expectedPercentage: 30},
    'Tanz / Yoga Shooting': {color: '#1e90ff', expectedPercentage: 15},
    'Sport Shooting': {color: '#6bb6ff', expectedPercentage: 5},
    'Boudoir Shooting': {color: '#daa520', expectedPercentage: 25},
    'Pärchen Shooting': {color: '#ff69b4', expectedPercentage: 15},
    'Hochzeit Shooting': {color: '#d3d3d3', expectedPercentage: 0},
    'Haustier Shooting': {color: '#ff6200', expectedPercentage: 10},
  };
  formShooting: FormGroup;
  chartData: Array<ChartConfig<ChartType>> = [];

  constructor(private apiService: ShootingStatisticApiService, private adminLoginService: AdminLoginService, formBuilder: FormBuilder) {
    this.formShooting = formBuilder.group({
      'showMinor': formBuilder.control(true),
      'showGroups': formBuilder.control(true),
    });

    this.formShooting.valueChanges.subscribe({next: value => this.loadShootingStatistics(value)});
  }

  ngOnInit(): void {
    this.loadShootingStatistics(this.formShooting.value);
  }

  private loadShootingStatistics(value: { showMinor: boolean, showGroups: boolean }) {
    const {showMinor, showGroups} = value;
    const data = this.adminLoginService.data;
    if (!data) {
      return;
    }

    this.apiService.getShootingStatistics(data, showMinor, showGroups)
        .subscribe({
          next: data => this.mapDataForChart(data),
        });
  }

  private mapDataForChart(data: ShootingStatisticsResponse) {
    const allYears = Object.keys(data);
    const yearsAsInt = allYears.map(y => parseInt(y, 10));

    function computeTotalPerYear() {
      const o: { [year: string]: number } = {};
      allYears.forEach(year => {
        o[year] = Object.values(data[year]).reduce((a, b) => a + b);
      });
      return o;
    }

    const sortByShootingHelper: { [shooting: string]: number } = {};
    Object.keys(StatisticPerYearComponent.overrides)
          .forEach((shootingName, idx) => {
            sortByShootingHelper[shootingName] = idx;
          });

    const totalPerYear = computeTotalPerYear();

    const allShootingTypesWithDuplicates = Object.values(data).flatMap(o => Object.keys(o));

    const allShootingTypes = [
      ...new Set(
        allShootingTypesWithDuplicates.sort(
          (a, b) => {
            const sa = sortByShootingHelper[a] ?? 0;
            const sb = sortByShootingHelper[b] ?? 0;
            return sa - sb;
          }),
      ),
    ];

    function computeAbsoluteDataset(): ChartDataset<'bar', number[]>[] {
      return allShootingTypes.map(type => {
        const color = StatisticPerYearComponent.overrides[type].color;
        return {
          data: allYears.map(year => {
            const value = data[year][type];
            return value !== undefined ? value : 0;
          }),
          label: type,
          stack: 'a',
          backgroundColor: color,
          hoverBackgroundColor: shadeColor(color, 35),
          tooltip: {
            callbacks: {
              label: (context: TypedTooltipItem<'bar', number>) => {
                return ` ${context.dataset.label} - ${context.label} (${context.raw} / ${totalPerYear[context.label]})`;
              },
            },
          },
        };
      });
    }

    function computeRelativeDataset(): ChartDataset<'bar', number[]>[] {
      return allShootingTypes.map(type => {
        const color = StatisticPerYearComponent.overrides[type].color;
        return {
          data: allYears.map(year => {
            const value = data[year][type];
            return value !== undefined ? (value / totalPerYear[year] * 100) : 0;
          }),
          label: type,
          stack: 'a',
          backgroundColor: color,
          hoverBackgroundColor: shadeColor(color, 35),
          tooltip: {
            callbacks: {
              label: (context: TypedTooltipItem<'bar', number>) => {
                return ` ${context.dataset.label} - ${context.label} (${context.raw.toFixed(2)}%)`;
              },
            },
          },
        };
      });
    }

    function computeSollIstDataset(): ChartDataset<'doughnut', number[]>[] {
      const backgroundColor = Object.values(StatisticPerYearComponent.overrides).map(e => e.color);
      const hoverBackgroundColor = Object.values(StatisticPerYearComponent.overrides).map(e => shadeColor(e.color, 35));

      const maxYear = Math.max(...yearsAsInt);
      const maxYearAsString = String(maxYear);
      const yearData = data[maxYearAsString];

      return [
        {
          label: 'Soll',
          data: Object.values(StatisticPerYearComponent.overrides).map(e => e.expectedPercentage),
          backgroundColor: backgroundColor,
          hoverBackgroundColor: hoverBackgroundColor,
          borderColor: hoverBackgroundColor,
          hoverBorderColor: backgroundColor,
        }, {
          label: maxYearAsString,
          data: Object.keys(StatisticPerYearComponent.overrides).map(s => yearData[s] / totalPerYear[maxYear] * 100),
          backgroundColor: backgroundColor,
          hoverBackgroundColor: hoverBackgroundColor,
          borderColor: hoverBackgroundColor,
          hoverBorderColor: backgroundColor,
          weight: 2,
        },
      ];
    }

    const sharedOptions: ChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
    };

    this.chartData = [
      {
        title: 'Soll / Ist Statistik',
        labels: Object.keys(StatisticPerYearComponent.overrides),
        dataSet: computeSollIstDataset(),
        chartLegend: true,
        chartType: 'doughnut',
        options: {
          ...sharedOptions,
          plugins: {
            tooltip: {
              callbacks: {
                label: (item) => ` ${item.dataset.label} - ${item.label}: ${(item as TypedTooltipItem<'doughnut', number>).raw.toFixed(2)}%`,
              },
            },
          },
        },
      },
      {
        title: 'Relativ',
        labels: allYears,
        dataSet: computeRelativeDataset(),
        chartType: 'bar',
        chartLegend: true,
        options: {
          ...sharedOptions,
          scales: {
            y: {
              max: 100,
              ticks: {
                callback: (value) => `${value}%`,
              },
            },
          },
        },
      },
      {
        title: 'Absolut',
        labels: allYears,
        dataSet: computeAbsoluteDataset(),
        chartType: 'bar',
        chartLegend: true,
        options: sharedOptions,
      },
    ];
  };

}

type ChartConfig<Type extends ChartType> = {
  title: string,
  options: ChartOptions<Type>,
  labels: string[],
  chartType: Type,
  chartLegend: boolean
  dataSet: ChartDataset<Type, number[]>[]
}

type TypedTooltipItem<Type extends ChartType, RAW> = TooltipItem<Type> & { raw: RAW }

// https://stackoverflow.com/a/13532993/1870799
function shadeColor(color: string, percent: number) {

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
