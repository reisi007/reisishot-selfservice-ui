import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {AdminLoginComponent} from './login/admin-login.component';
import {AdminProtectedAreaGuardService} from './admin-protected-area-guard.service';
import {AdminLoginDataService} from './login/admin-login-data.service';

const routes: Routes = [{
  path: '',
  component: DashboardComponent,
  data: {title: 'Admin Dashboard'},
  canActivateChild: [AdminProtectedAreaGuardService],
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
    {
      path: 'statistics',
      loadChildren: () => import('../dashboards/statistics-dashboard/statistics-dashboard.module').then(m => m.StatisticsDashboardModule),
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [AdminProtectedAreaGuardService, AdminLoginDataService],
  exports: [RouterModule],
})
export class DashboardRoutingModule {
}
