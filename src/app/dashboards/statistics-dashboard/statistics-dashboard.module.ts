import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StatisticsDashboardRoutingModule} from './statistics-dashboard-routing.module';
import {StatisticsDashboardComponent} from './statistics-dashboard.component';
import {StatisticPerYearComponent} from './shooting-per-year-statistc/statistic-per-year.component';
import {ShootingStatisticApiService} from './api/shooting-statistic-api.service';
import {NgChartsModule} from 'ng2-charts';
import {ReactiveFormsModule} from '@angular/forms';
import {ShootingPerMonthStatisticComponent} from './shooting-per-month-statistic/shooting-per-month-statistic.component';
import {RenderChartsComponent} from './render-charts/render-charts.component';


@NgModule({
  declarations: [
    StatisticsDashboardComponent,
    StatisticPerYearComponent,
    ShootingPerMonthStatisticComponent,
    RenderChartsComponent,
  ],
  providers: [ShootingStatisticApiService],
  imports: [
    CommonModule,
    StatisticsDashboardRoutingModule,
    NgChartsModule,
    ReactiveFormsModule,
  ],
})
export class StatisticsDashboardModule {
}
