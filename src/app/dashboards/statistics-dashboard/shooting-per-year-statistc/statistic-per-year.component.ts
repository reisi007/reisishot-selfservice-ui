import {Component, Input} from '@angular/core';
import {ShootingStatisticApiService} from '../api/shooting-statistic-api.service';
import {ChartDataset, ChartType} from 'chart.js';
import {ShootingStatisticsResponsePerYear} from '../api/Model';
import {AdminLoginDataService} from '../../../dashboard/login/admin-login-data.service';
import {ChartConfig, OVERRIDES, shadeColor, SHARED_OPTIONS, TypedTooltipItem} from '../StatisticUtils';
import {ShootingFormValue} from '../statistics-dashboard.component';

@Component({
  selector: 'app-shooting-per-year-statistc',
  templateUrl: './shooting-per-year-statistc.component.html',
  styleUrls: ['./shooting-per-year-statistc.component.scss'],
})
export class StatisticPerYearComponent {

  @Input()
  set querySettings(value: ShootingFormValue) {
    const {showMinor, showGroups} = value;
    const data = this.adminLoginService.dataOrError;

    this.apiService.getShootingStatisticsPerYear(data, showMinor, showGroups)
        .subscribe({
          next: data => this.mapDataForChart(data),
        });
  }

  chartData: Array<ChartConfig<ChartType>> = [];

  constructor(
    private apiService: ShootingStatisticApiService,
    private adminLoginService: AdminLoginDataService,
  ) {
  }

  private mapDataForChart(data: ShootingStatisticsResponsePerYear) {
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
    Object.keys(OVERRIDES)
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
        const color = OVERRIDES[type].color;
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
        const color = OVERRIDES[type].color;
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
      const backgroundColor = Object.values(OVERRIDES).map(e => e.color);
      const hoverBackgroundColor = Object.values(OVERRIDES).map(e => shadeColor(e.color, 35));

      const maxYear = Math.max(...yearsAsInt);
      const maxYearAsString = String(maxYear);
      const yearData = data[maxYearAsString];

      return [
        {
          label: 'Soll',
          data: Object.values(OVERRIDES).map(e => e.expectedPercentage),
          backgroundColor: backgroundColor,
          hoverBackgroundColor: hoverBackgroundColor,
          borderColor: hoverBackgroundColor,
          hoverBorderColor: backgroundColor,
        }, {
          label: maxYearAsString,
          data: Object.keys(OVERRIDES).map(s => yearData[s] / totalPerYear[maxYear] * 100),
          backgroundColor: backgroundColor,
          hoverBackgroundColor: hoverBackgroundColor,
          borderColor: hoverBackgroundColor,
          hoverBorderColor: backgroundColor,
          weight: 2,
        },
      ];
    }

    this.chartData = [
      {
        title: 'Soll / Ist Statistik',
        labels: Object.keys(OVERRIDES),
        dataSet: computeSollIstDataset(),
        chartLegend: true,
        chartType: 'doughnut',
        options: {
          ...SHARED_OPTIONS,
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
          ...SHARED_OPTIONS,
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
        options: SHARED_OPTIONS,
      },
    ];
  };
}
