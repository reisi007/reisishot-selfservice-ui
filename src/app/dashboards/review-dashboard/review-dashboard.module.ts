import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReviewDashboardRoutingModule} from './review-dashboard-routing.module';
import {ReviewDashboardComponent} from './main/review-dashboard.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ReviewChartsComponent} from './review-charts/review-charts.component';
import {ReviewModule} from '../../review/review.module';
import {DisplayReviewComponent} from './display-review/display-review.component';
import {MarkdownModule} from '../../markdown/markdown.module';

@NgModule({
  declarations: [ReviewDashboardComponent, ReviewChartsComponent, DisplayReviewComponent],
  imports: [CommonModule, ReactiveFormsModule, ReviewDashboardRoutingModule, ReviewModule, MarkdownModule],
})
export class ReviewDashboardModule {
}
