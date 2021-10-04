import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WaitlistDashboardRoutingModule} from './waitlist-dashboard-routing.module';
import {WaitlistDashboardComponent} from './waitlist-dashboard.component';
import {WaitlistDashboardItemComponent} from './waitlist-dashboard-item/waitlist-dashboard-item.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ChangePwdComponent} from './change-pwd/change-pwd.component';


@NgModule({
  declarations: [
    WaitlistDashboardComponent,
    WaitlistDashboardItemComponent,
    ChangePwdComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    WaitlistDashboardRoutingModule,
  ],
})
export class WaitlistDashboardModule {
}
