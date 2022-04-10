import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WaitlistDashboardRoutingModule} from './waitlist-dashboard-routing.module';
import {WaitlistDashboardComponent} from './waitlist-dashboard.component';
import {WaitlistDashboardItemComponent} from './waitlist-dashboard-item/waitlist-dashboard-item.component';
import {ReactiveFormsModule} from '@angular/forms';

import {LeaderboardComponent} from './leaderboard/leaderboard.component';
import {PersonAssessComponent} from './person-assess/person-assess.component';
import {PersonAssessArbitraryComponent} from './person-assess-arbitrary/person-assess-arbitrary.component';
import {LeaderboardByYearComponent} from './leaderboard-by-year/leaderboard-by-year.component';
import {PendingSignaturesComponent} from './pending-signatures/pending-signatures.component';
import {
  AddShootingStatisticModalComponent,
} from './waitlist-dashboard-item/add-shooting-statistic-modal/add-shooting-statistic-modal.component';

@NgModule({
  declarations: [
    WaitlistDashboardComponent,
    WaitlistDashboardItemComponent,
    LeaderboardComponent,
    PersonAssessComponent,
    PersonAssessArbitraryComponent,
    LeaderboardByYearComponent,
    PendingSignaturesComponent,
    AddShootingStatisticModalComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    WaitlistDashboardRoutingModule],
})
export class WaitlistDashboardModule {
}
