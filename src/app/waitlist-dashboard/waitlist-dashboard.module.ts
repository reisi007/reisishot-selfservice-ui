import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WaitlistDashboardRoutingModule} from './waitlist-dashboard-routing.module';
import {WaitlistDashboardComponent} from './waitlist-dashboard.component';
import {WaitlistDashboardItemComponent} from './waitlist-dashboard-item/waitlist-dashboard-item.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ChangePwdComponent} from './change-pwd/change-pwd.component';
import {LeaderboardComponent} from './leaderboard/leaderboard.component';
import {PersonAssessComponent} from './person-assess/person-assess.component';
import {PersonAssessArbitraryComponent} from './person-assess-arbitrary/person-assess-arbitrary.component';

@NgModule({
  declarations: [WaitlistDashboardComponent, WaitlistDashboardItemComponent, ChangePwdComponent, LeaderboardComponent, PersonAssessComponent, PersonAssessArbitraryComponent],
  imports: [CommonModule, ReactiveFormsModule, WaitlistDashboardRoutingModule],
})
export class WaitlistDashboardModule {
}
