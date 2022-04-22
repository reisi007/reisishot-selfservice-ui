import {Component, Input} from '@angular/core';
import {ChartDataset, ChartType} from 'chart.js';
import {ChartConfig, OVERRIDES, shadeColor, SHARED_OPTIONS} from '../StatisticUtils';
import {ShootingStatisticApiService} from '../api/shooting-statistic-api.service';
import {AdminLoginDataService} from '../../../dashboard/login/admin-login-data.service';
import {ShootingStatisticsResponsePerMonth} from '../api/Model';
import * as dayjs from 'dayjs';
import {ShootingFormValue} from '../statistics-dashboard.component';

@Component({
  selector: 'app-shooting-per-month-statistic',
  templateUrl: './shooting-per-month-statistic.component.html',
  styleUrls: ['./shooting-per-month-statistic.component.scss'],
})
export class ShootingPerMonthStatisticComponent {

  chartData: Array<ChartConfig<ChartType>> = [];

  constructor(private apiService: ShootingStatisticApiService, private adminLoginService: AdminLoginDataService) {
  }

  @Input()
  set querySettings(data: ShootingFormValue) {
    const {showMinor, showGroups} = data;
    this.apiService.getShootingStatisticsPerMonth(this.adminLoginService.dataOrError, showMinor, showGroups)
        .subscribe({
          next: data => this.buildDiagram(data),
        });
  }


  private buildDiagram(data: ShootingStatisticsResponsePerMonth) {
    function computeDataset(): Array<ChartDataset<'line', number[]>> {
      return Object.keys(OVERRIDES).map(type => {
        const backgroundColor = OVERRIDES[type].color;
        const hoverBackgroundColor = shadeColor(backgroundColor, 35);

        return {
          label: type,
          data: Object.values(data).map(monthStatistics => monthStatistics[type] ?? 0),
          fill: false,
          backgroundColor: backgroundColor,
          borderColor: hoverBackgroundColor,
          pointBackgroundColor: hoverBackgroundColor,
          pointHoverBackgroundColor: backgroundColor,
          tension: 0.25,
        };
      });

    }

    this.chartData = [
      {
        title: 'Shootings über das Jahr',
        chartType: 'line',
        chartLegend: true,
        labels: Object.keys(data).map(e => parseInt(e) - 1).map(m => dayjs().month(m)).map(date => date.format('MMMM')),
        dataSet: computeDataset(),
        options: SHARED_OPTIONS,
      },
    ];
  }

}
