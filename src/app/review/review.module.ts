import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ReviewRoutingModule} from './review-routing.module';
import {ReviewComponent} from './review.component';
import {RatingComponent} from './rating/rating.component';
import {LoadingReviewComponent} from './loading-review/loading-review.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    RatingComponent,
    ReviewComponent,
    LoadingReviewComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ReviewRoutingModule,
  ],
})
export class ReviewModule {
}
