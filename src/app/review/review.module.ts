import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ReviewRoutingModule} from './review-routing.module';
import {ReviewComponent} from './review/review.component';
import {RatingComponent} from './review/rating/rating.component';
import {LoadingReviewComponent} from './loading-review/loading-review.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AdminReviewComponent} from './landing/admin-review-landing/admin-review.component';
import {LoadingReviewLandingComponent} from './landing/loading-review-landing/loading-review-landing.component';
import {ReviewLandingComponent} from './landing/review-landing/review-landing.component';
import {MarkdownModule} from '../markdown/markdown.module';

@NgModule({
  declarations: [
    RatingComponent,
    ReviewComponent,
    LoadingReviewComponent,
    AdminReviewComponent,
    LoadingReviewLandingComponent,
    ReviewLandingComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ReviewRoutingModule,
    MarkdownModule,
  ],
  exports: [
    RatingComponent,
  ],
})
export class ReviewModule {
}
