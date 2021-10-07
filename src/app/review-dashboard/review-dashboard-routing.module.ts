import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReviewDashboardComponent} from './main/review-dashboard.component';

const routes: Routes = [{path: '', component: ReviewDashboardComponent, data: {title: 'Review Statistik'}}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewDashboardRoutingModule {
}
