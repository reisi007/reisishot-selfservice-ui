import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {AdminWaitlistRecord, WaitlistItemWithRegistrations} from '../admin-api/waitlist-admin-api';
import {WaitlistAdminApiService} from '../admin-api/waitlist-admin-api.service';
import {ReferralApiService} from '../../referral/api/referral-api.service';
import {ReferralType} from '../../referral/api/referral-api.model';

@Component({
  selector: 'app-waitlist-dashboard-item',
  templateUrl: './waitlist-dashboard-item.component.html',
  styleUrls: ['./waitlist-dashboard-item.component.scss'],
})
export class WaitlistDashboardItemComponent {
  private data!: WaitlistItemWithRegistrations;

  private internalUserPwd!: { user: string; pwd: string };

  constructor(
    private waitlistAdminApi: WaitlistAdminApiService,
    private referralApi: ReferralApiService,
    private router: Router,
  ) {
  }

  get credentials(): { user: string; pwd: string } {
    return this.internalUserPwd;
  }

  @Input() set credentials(value: { user: string; pwd: string }) {
    this.internalUserPwd = value;
  }

  get item(): WaitlistItemWithRegistrations {
    return this.data;
  }

  @Input() set item(value: WaitlistItemWithRegistrations) {
    this.data = value;
  }

  public createContract(idx: number, waitlistRecord: AdminWaitlistRecord) {
    this.router.navigate(['contracts', 'dashboard'], {state: {person: waitlistRecord}});
  }

  public ignore(idx: number, waitlistRecord: AdminWaitlistRecord) {
    const data = this.credentials;
    this.waitlistAdminApi
        .ignoreWaitlistItem(data.user, data.pwd, waitlistRecord.item_id)
        .subscribe(() => (waitlistRecord.done_internal = '1'));
  }

  public done(idx: number, waitlistRecord: AdminWaitlistRecord) {
    const data = this.credentials;
    this.waitlistAdminApi.removeWaitlistItem(data.user, data.pwd, waitlistRecord.item_id).subscribe(() => this.removeRegistration(idx));
  }

  public positiv(idx: number, registration: AdminWaitlistRecord) {
    this.referralApi.addPointsDirect(
      {
        email: registration.email,
        action: ReferralType.SHOOTING_GOOD,
      }
      , this.credentials,
    ).subscribe(() => window.alert('Positive Bewertung erfolgreich abgegeben'));
  }

  public negativ(idx: number, registration: AdminWaitlistRecord) {
    this.referralApi.addPointsDirect(
      {
        email: registration.email,
        action: ReferralType.SHOOTING_BAD,
      }
      , this.credentials,
    ).subscribe(() => window.alert('Negative Bewertung erfolgreich abgegeben'));
  }

  private removeRegistration(idx: number): void {
    this.data?.registrations.splice(idx, 1);
  }
}
