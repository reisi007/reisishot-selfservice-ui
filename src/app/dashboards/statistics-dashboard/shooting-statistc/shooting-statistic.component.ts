import {Component, OnInit} from '@angular/core';
import {ShootingStatisticApiService} from '../api/shooting-statistic-api.service';
import {ChartDataset, ChartOptions, ChartType} from 'chart.js';
import {ShootingStatisticsResponse} from '../../review-dashboard/api/Model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AdminLoginService} from '../../../dashboard/login/admin-login.service';

@Component({
  selector: 'app-shooting-statistic',
  templateUrl: './shooting-statistic.component.html',
  styleUrls: ['./shooting-statistic.component.scss'],
})
export class ShootingStatisticComponent implements OnInit {

  private static colorOverrides: { [name: string]: string } = {
    'Pärchen Shooting': '#ff69b4',
    'Porträt Shooting': '#1e90ff',
    'Haustier Shooting': '#ff6200',
    'Boudoir Shooting': '#daa520',
    'Sport Shooting': '#6bb6ff',
    'Tanz / Yoga Shooting': '#006ad1',
    'Hochzeit Shooting': '#d3d3d3',
  };
  formShooting: FormGroup;
  chartData: ChartConfig<'bar'> | undefined;

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

    const totalPerYear = computeTotalPerYear();


    const allShootingTypesWithDuplicates = Object.values(data)
                                                 .flatMap(o => Object.keys(o));
    const allShootingTypes = [...new Set(allShootingTypesWithDuplicates.sort())];


    function computeAbsoluteDataset(): ChartDataset<'bar', number[]>[] {
      return allShootingTypes.map(type => {
        return {
          data: allYears.map(year => {
            const value = data[year][type];
            return value !== undefined ? value : 0;
          }),
          label: type,
          stack: 'a',
          backgroundColor: ShootingStatisticComponent.colorOverrides[type],
          tooltip: {
            callbacks: {
              label: (context: Context<number>) => {
                return ` ${context.dataset.label} - ${context.label} (${context.raw} / ${totalPerYear[context.label]})`;
              },
            },
          },
        };
      });
    }

    function computeRelativeDataset(): ChartDataset<'bar', number[]>[] {
      return allShootingTypes.map(type => {
        return {
          data: allYears.map(year => {
            const value = data[year][type];
            return value !== undefined ? (value / totalPerYear[year] * 100) : 0;
          }),
          label: type,
          stack: 'a',
          backgroundColor: ShootingStatisticComponent.colorOverrides[type],
          tooltip: {
            callbacks: {
              label: (context: Context<number>) => {
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
    };
    this.chartData = {
      labels: allYears,
      absoluteDataSet: computeAbsoluteDataset(),
      relativeDataSet: computeRelativeDataset(),
      chartType: 'bar',
      chartLegend: true,
      absoluteOptions: sharedOptions,
      relativeOptions: {
        ...sharedOptions,
        scales: {
          y: {
            ticks: {
              callback: (value) => `${value}%`,
            },
          },
        },
      },
    };
  };

}

type ChartConfig<Type extends ChartType> = {
  absoluteOptions: ChartOptions<Type>,
  relativeOptions: ChartOptions<Type>,
  labels: string[],
  chartType: Type,
  chartLegend: boolean
  absoluteDataSet: ChartDataset<Type, number[]>[]
  relativeDataSet: ChartDataset<Type, number[]>[]
}

type Context<T> = { label: string; formattedValue: string, raw: T, dataset: { label: string } }
