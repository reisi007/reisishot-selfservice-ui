import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChangePwdComponent} from './change-pwd/change-pwd.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {AdminLoginFormComponent} from './login/admin-login/admin-login-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AdminLoginComponent} from './login/admin-login.component';
import {ShootingDatesModule} from '../shooting-dates/shooting-dates.module';
import {ShootingDateViewResponsiveComponent} from './login/shooting-date-view-responsive/shooting-date-view-responsive.component';
import {ShootingDateViewInternalComponent} from './login/shooting-date-view-internal/shooting-date-view-internal.component';
import {
  ShootingDateInternalCellComponent,
} from './login/shooting-date-view-internal/shooting-date-internal-cell/shooting-date-internal-cell.component';
import {AdminLoginDataService} from './login/admin-login-data.service';
import {PrivateCalendarApiService} from './login/shooting-date-view-internal/private-calendar-api.service';


@NgModule({
  declarations: [
    ShootingDateViewInternalComponent,
    ShootingDateInternalCellComponent,
    ShootingDateViewResponsiveComponent,
    DashboardComponent,
    AdminLoginFormComponent,
    ChangePwdComponent,
    AdminLoginComponent,
  ],
  providers: [AdminLoginDataService, PrivateCalendarApiService],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    ShootingDatesModule,
  ],
})
export class DashboardModule {
}
