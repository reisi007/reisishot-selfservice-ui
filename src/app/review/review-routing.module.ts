import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReviewComponent} from './review.component';
import {LoadingReviewComponent} from './loading-review/loading-review.component';

const routes: Routes = [
  {path: '', component: ReviewComponent, data: {title: 'Bewertung abgeben'}},
  {path: ':mail', component: ReviewComponent, data: {title: 'Bewertung abgeben'}},
  {path: ':mail/:access_key', component: LoadingReviewComponent, data: {title: 'Bewertung bearbeiten'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewRoutingModule {
}
