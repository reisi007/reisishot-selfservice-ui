import {Component, OnInit} from '@angular/core';
import {WaitlistAdminApiService} from './admin-api/waitlist-admin-api.service';
import {LeaderboardEntry, WaitlistItemWithRegistrations} from './admin-api/waitlist-admin-api';
import {AdminLoginDataService} from '../../dashboard/login/admin-login-data.service';
import {AdminUserData} from '../../dashboard/login/admin-login/AdminUserData';

@Component({
  selector: 'app-waitlist-dashboard',
  templateUrl: './waitlist-dashboard.component.html',
  styleUrls: ['./waitlist-dashboard.component.scss'],
})
export class WaitlistDashboardComponent implements OnInit {

  items!: Array<WaitlistItemWithRegistrations>;
  leaderboard!: Array<LeaderboardEntry>;


  constructor(
    private waitlistAdminApi: WaitlistAdminApiService,
    private adminLoginService: AdminLoginDataService,
  ) {
  }

  get credentials(): AdminUserData | null {
    return this.adminLoginService.data;
  }

  ngOnInit(): void {
    const curData = this.credentials;
    if (curData == null) {
      return;
    }

    this.waitlistAdminApi.loadData(curData.user, curData.pwd).subscribe(data => {
      this.items = data.registrations;
      this.leaderboard = data.leaderboard;
    });
  }
}
