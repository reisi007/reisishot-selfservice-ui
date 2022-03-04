import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WaitlistAdminApiService} from '../admin-api/waitlist-admin-api.service';
import * as dayjs from 'dayjs';
import {LeaderboardEntry} from '../admin-api/waitlist-admin-api';
import {AdminUserData} from '../../../dashboard/login/admin-login/AdminUserData';

@Component({
  selector: 'app-leaderboard-by-year',
  templateUrl: './leaderboard-by-year.component.html',
  styleUrls: ['./leaderboard-by-year.component.scss'],
})
export class LeaderboardByYearComponent implements OnInit {

  inputForm!: FormGroup;

  items: Array<LeaderboardEntry> | undefined;

  @Input()
  auth!: AdminUserData;

  constructor(
    private waitlistAdminApi: WaitlistAdminApiService,
    private formBuilder: FormBuilder,
  ) {
  }

  get year(): number {
    return this.inputForm.get('year')?.value;
  }

  ngOnInit(): void {
    this.inputForm = this.formBuilder.group({
      year: this.formBuilder.control(dayjs().year(), [Validators.required, Validators.min(2018)]),
    });
    this.updateTables();
    this.inputForm.valueChanges.subscribe(value => this.updateTables());
  }

  updateTables() {
    this.waitlistAdminApi.loadLeaderboardByYear(this.auth.user, this.auth.pwd, this.year)
        .subscribe(data => this.items = data);
  }
}
