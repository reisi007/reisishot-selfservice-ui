import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChangePwdComponent} from './change-pwd/change-pwd.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {AdminLoginFormComponent} from './login/admin-login/admin-login-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AdminLoginService} from './login/admin-login.service';
import {AdminLoginComponent} from './login/admin-login.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AdminLoginFormComponent,
    ChangePwdComponent,
    AdminLoginComponent,
  ],
  providers: [AdminLoginService],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
  ],
})
export class DashboardModule {
}
