import {Component, Input} from '@angular/core';
import {WaitlistPerson} from '../api/waitlist-api';

@Component({
  selector: 'app-referral-customer-info',
  templateUrl: './referral-customer-info.component.html',
  styleUrls: ['./referral-customer-info.component.scss'],
})
export class ReferralCustomerInfoComponent {

  textCopied = false;

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

  select($event: MouseEvent) {
    const target = $event.target as HTMLTextAreaElement;
    target.select();
    navigator.clipboard.writeText(target.value).then(() => this.textCopied = true);
  }
}
