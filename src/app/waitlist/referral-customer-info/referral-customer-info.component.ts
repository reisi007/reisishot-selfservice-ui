import {Component, Input} from '@angular/core';
import {WaitlistPerson} from '../api/waitlist-api';

@Component({
  selector: 'app-referral-customer-info',
  templateUrl: './referral-customer-info.component.html',
  styleUrls: ['./referral-customer-info.component.scss'],
})
export class ReferralCustomerInfoComponent {

  constructor() {
  }

  private _user!: WaitlistPerson;

  get user(): WaitlistPerson {
    return this._user;
  }

  @Input() set user(value: WaitlistPerson) {
    this._user = value;
  }

  init(): void {
  }

}
