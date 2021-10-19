import {Component, Input} from '@angular/core';
import {Userdata, WaitlistPerson} from '../api/waitlist-api';
import {ReferralPointEntry} from '../referral-api/referral-api.model';
import {ReferralApiService} from '../referral-api/referral-api.service';

@Component({
  selector: 'app-referral-customer-info',
  templateUrl: './referral-customer-info.component.html',
  styleUrls: ['./referral-customer-info.component.scss'],
})
export class ReferralCustomerInfoComponent {

  referralLinkCopied = false;
  showReferralPointHistory = false;

  historyData: Array<ReferralPointEntry> | undefined;
  @Input() auth!: Userdata;

  constructor(
    private referralApi: ReferralApiService,
  ) {
  }

  private _user!: WaitlistPerson;

  get user(): WaitlistPerson {
    return this._user;
  }

  @Input() set user(value: WaitlistPerson) {
    this._user = value;
  }

  showHistory() {
    this.showReferralPointHistory = true;
    this.referralApi.loadPointHistory(this.auth)
        .subscribe(data => this.historyData = data);
  }

  hideHistory() {
    this.showReferralPointHistory = false;
    this.historyData = undefined;
  }

  select($event: MouseEvent) {
    const target = $event.target as HTMLElement;
    navigator.clipboard.writeText(target.innerText).then(() => this.referralLinkCopied = true);
  }
}
