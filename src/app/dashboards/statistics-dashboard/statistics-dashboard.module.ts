import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StatisticsDashboardRoutingModule} from './statistics-dashboard-routing.module';
import {StatisticsDashboardComponent} from './statistics-dashboard.component';
import {ShootingStatisticComponent} from './shooting-statistc/shooting-statistic.component';
import {ShootingStatisticApiService} from './api/shooting-statistic-api.service';
import {NgChartsModule} from 'ng2-charts';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    StatisticsDashboardComponent,
    ShootingStatisticComponent,
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
