import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WaitlistComponent} from './waitlist/waitlist.component';

const routes: Routes = [
  {path: '', component: WaitlistComponent, data: {title: 'Warteliste für Shootings'}},
  {path: 'dashboard', loadChildren: () => import('../waitlist-dashboard/waitlist-dashboard.module').then(m => m.WaitlistDashboardModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WaitlistRoutingModule {
}
