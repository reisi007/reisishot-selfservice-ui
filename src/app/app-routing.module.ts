import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/overview', pathMatch: 'full'},
  {path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
  {path: 'contracts', loadChildren: () => import('./contract/contract.module').then(m => m.ContractModule)},
  {path: 'waitlist', loadChildren: () => import('./waitlist/waitlist.module').then(m => m.WaitlistModule)},
  {path: 'review', loadChildren: () => import('./review/review.module').then(m => m.ReviewModule)},
  {path: 'overview', loadChildren: () => import('./root/root.module').then(m => m.RootModule)},
  {path: 'mail2disk', loadChildren: () => import('./mail2disk/mail2disk.module').then(m => m.Mail2diskModule)},
  {path: '**', redirectTo: '/', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
