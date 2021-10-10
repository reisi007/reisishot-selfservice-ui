import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OverviewComponent} from './overview/overview.component';

const routes: Routes = [
  {path: '', component: OverviewComponent, data: {title: 'Verfügbare Services'}},
  {
    path: 'contracts/dashboard',
    loadChildren: () => import('./contract-dashboard/contract-dashboard.module').then(m => m.ContractDashboardModule),
  },
  {path: 'contracts', loadChildren: () => import('./contract/contract.module').then(m => m.ContractModule)},
  {
    path: 'waitlist/dashboard',
    loadChildren: () => import('./waitlist-dashboard/waitlist-dashboard.module').then(m => m.WaitlistDashboardModule),
  },
  {path: 'waitlist', loadChildren: () => import('./waitlist/waitlist.module').then(m => m.WaitlistModule)},
  {path: 'review/dashboard', loadChildren: () => import('./review-dashboard/review-dashboard.module').then(m => m.ReviewDashboardModule)},
  {path: 'review', loadChildren: () => import('./review/review.module').then(m => m.ReviewModule)},
  {path: '**', redirectTo: '/', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
