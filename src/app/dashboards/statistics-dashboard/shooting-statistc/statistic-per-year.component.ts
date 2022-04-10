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
          backgroundColor: StatisticPerYearComponent.colorOverrides[type],
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
        return {
          data: allYears.map(year => {
            const value = data[year][type];
            return value !== undefined ? (value / totalPerYear[year] * 100) : 0;
          }),
          label: type,
          stack: 'a',
          backgroundColor: StatisticPerYearComponent.colorOverrides[type],
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
