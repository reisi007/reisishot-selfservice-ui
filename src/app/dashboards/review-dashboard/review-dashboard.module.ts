import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReviewDashboardRoutingModule} from './review-dashboard-routing.module';
import {ReviewDashboardComponent} from './main/review-dashboard.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ReviewInfoComponent} from './review-info/review-info.component';
import {ReviewModule} from '../../review/review.module';
import {DisplayReviewComponent} from './display-review/display-review.component';
import {MarkdownModule} from '../../markdown/markdown.module';

@NgModule({
  declarations: [ReviewDashboardComponent, ReviewInfoComponent, DisplayReviewComponent],
  imports: [CommonModule, ReactiveFormsModule, ReviewDashboardRoutingModule, ReviewModule, MarkdownModule],
})
export class ReviewDashboardModule {
}
