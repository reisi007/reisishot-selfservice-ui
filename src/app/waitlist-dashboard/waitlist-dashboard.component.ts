import {Component, OnInit} from '@angular/core';
import {WaitlistAdminApiService} from './admin-api/waitlist-admin-api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LeaderboardEntry, WaitlistItemWithRegistrations} from './admin-api/waitlist-admin-api';

@Component({
  selector: 'app-waitlist-dashboard',
  templateUrl: './waitlist-dashboard.component.html',
  styleUrls: ['./waitlist-dashboard.component.scss'],
})
export class WaitlistDashboardComponent implements OnInit {
  passwordForm!: FormGroup;
  items!: Array<WaitlistItemWithRegistrations>;
  leaderboard!: Array<LeaderboardEntry>;

  constructor(
    private waitlistAdminApi: WaitlistAdminApiService,
    private formBuilder: FormBuilder,
  ) {
  }

  get credentials(): { user: string; pwd: string } {
    return this.passwordForm.getRawValue();
  }

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      user: this.formBuilder.control('', [Validators.required]),
      pwd: this.formBuilder.control('', [Validators.required]),
    });
  }

  fetchAllData(): void {
    const curData = this.credentials;
    this.waitlistAdminApi.loadData(curData.user, curData.pwd).subscribe(data => {
      this.items = data.registrations;
      this.leaderboard = data.leaderboard;
    });
  }
}
