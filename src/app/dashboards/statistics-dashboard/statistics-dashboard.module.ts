import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StatisticsDashboardRoutingModule} from './statistics-dashboard-routing.module';
import {StatisticsDashboardComponent} from './statistics-dashboard.component';
import {StatisticPerYearComponent} from './shooting-statistc/statistic-per-year.component';
import {ShootingStatisticApiService} from './api/shooting-statistic-api.service';
import {NgChartsModule} from 'ng2-charts';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    StatisticsDashboardComponent,
    StatisticPerYearComponent,
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
