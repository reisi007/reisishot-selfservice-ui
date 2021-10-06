import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminReviewComponent} from './landing/admin-review-landing/admin-review.component';
import {LoadingReviewLandingComponent} from './landing/loading-review-landing/loading-review-landing.component';
import {ReviewLandingComponent} from './landing/review-landing/review-landing.component';

const routes: Routes = [
  {path: '', component: ReviewLandingComponent, data: {title: 'Bewertung abgeben'}},
  {path: ':mail', component: ReviewLandingComponent, data: {title: 'Bewertung abgeben'}},
  {path: ':mail/:access_key', component: LoadingReviewLandingComponent, data: {title: 'Bewertung bearbeiten'}},
  {path: ':mail/:access_key/admin', component: AdminReviewComponent, data: {title: 'Bewertung bearbeiten'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewRoutingModule {
}
