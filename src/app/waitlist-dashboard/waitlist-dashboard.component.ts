import {Component, OnInit} from '@angular/core';
import {WaitlistAdminApiService} from '../waitlist/admin-api/waitlist-admin-api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {WaitlistItemWithRegistrations} from '../waitlist/admin-api/waitlist-admin-api';

@Component({
  selector: 'app-waitlist-dashboard',
  templateUrl: './waitlist-dashboard.component.html',
  styleUrls: ['./waitlist-dashboard.component.scss'],
})
export class WaitlistDashboardComponent implements OnInit {
  passwordForm: FormGroup;
  items: Observable<Array<WaitlistItemWithRegistrations>>;

  constructor(
    private waitlistAdminApi: WaitlistAdminApiService,
    private formBuilder: FormBuilder,
  ) {
  }

  get credentials(): { user: string, pwd: string } {
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
    this.items = this.waitlistAdminApi.getWaitlistItems(curData.user, curData.pwd);
  }

}
