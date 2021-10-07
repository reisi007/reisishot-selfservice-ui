import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GaugeChartModule} from 'angular-gauge-chart';
import {ReviewDashboardRoutingModule} from './review-dashboard-routing.module';
import {ReviewDashboardComponent} from './main/review-dashboard.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ReviewChartsComponent} from './review-charts/review-charts.component';
import {ReviewModule} from '../review/review.module';


@NgModule({
  declarations: [
    ReviewDashboardComponent,
    ReviewChartsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ReviewDashboardRoutingModule,
    GaugeChartModule,
    ReviewModule,
  ],
})
export class ReviewDashboardModule {
}
