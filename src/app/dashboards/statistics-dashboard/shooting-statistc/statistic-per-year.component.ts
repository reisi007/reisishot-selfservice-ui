import {Component, OnInit} from '@angular/core';
import {ShootingStatisticApiService} from '../api/shooting-statistic-api.service';
import {ChartData, ChartDataset, ChartOptions, ChartType, LegendItem, TooltipItem} from 'chart.js';
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
  private static colorOverrides: { [name: string]: string } = {
    'Porträt Shooting': '#0031d1',
    'Tanz / Yoga Shooting': '#1e90ff',
    'Sport Shooting': '#6bb6ff',
    'Boudoir Shooting': '#daa520',
    'Pärchen Shooting': '#ff69b4',
    'Hochzeit Shooting': '#d3d3d3',
    'Haustier Shooting': '#ff6200',
  };
  formShooting: FormGroup;
  chartData: Array<ChartConfig<'bar'>> = [];

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

    function computeTotalPerYear() {
      const o: { [year: string]: number } = {};
      allYears.forEach(year => {
        o[year] = Object.values(data[year]).reduce((a, b) => a + b);
      });
      return o;
    }

    const sortByShootingHelper: { [shooting: string]: number } = {};
    Object.keys(StatisticPerYearComponent.colorOverrides)
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
        const color = StatisticPerYearComponent.colorOverrides[type];
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
        const color = StatisticPerYearComponent.colorOverrides[type];
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

    const sharedOptions: ChartOptions<'bar'> = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            sort(a: LegendItem, b: LegendItem, data: ChartData): number {
              const sa = sortByShootingHelper[a.text] ?? 0;
              const sb = sortByShootingHelper[b.text] ?? 0;
              return sa - sb;
            },
          },
        },
      },
    };
    this.chartData = [
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
              ticks: {
                callback: (value) => `${value}%`,
              },
            },
          },
        },
      }, {
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
