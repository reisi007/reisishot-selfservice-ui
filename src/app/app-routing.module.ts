import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OverviewComponent} from './overview/overview.component';


const routes: Routes = [
  {path: '', component: OverviewComponent, data: {title: 'Verfügbare Services'}},
  {path: 'contracts', loadChildren: () => import('./contract/contract.module').then(m => m.ContractModule)},
  {path: 'waitlist', loadChildren: () => import('./waitlist/waitlist.module').then(m => m.WaitlistModule)},
  {path: 'review', loadChildren: () => import('./review/review.module').then(m => m.ReviewModule)},

  {path: '**', redirectTo: '/', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
