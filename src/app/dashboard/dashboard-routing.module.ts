import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {AdminLoginComponent} from './login/admin-login.component';

const routes: Routes = [{
  path: '',
  component: DashboardComponent,
  data: {title: 'Admin Dashboard'},
  children: [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'login',
    },
    {
      path: 'login',
      component: AdminLoginComponent,
    },
    {
      path: 'contracts',
      loadChildren: () => import('../dashboards/contract-dashboard/contract-dashboard.module').then(m => m.ContractDashboardModule),
    },
    {
      path: 'waitlist',
      loadChildren: () => import('../dashboards/waitlist-dashboard/waitlist-dashboard.module').then(m => m.WaitlistDashboardModule),
    }, {
      path: 'reviews',
      loadChildren: () => import('../dashboards/review-dashboard/review-dashboard.module').then(m => m.ReviewDashboardModule),
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {
}
