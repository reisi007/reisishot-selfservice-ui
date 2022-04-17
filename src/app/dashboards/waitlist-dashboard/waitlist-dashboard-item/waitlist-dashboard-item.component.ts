import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminWaitlistRecord, WaitlistItemWithRegistrations} from '../admin-api/waitlist-admin-api';
import {WaitlistAdminApiService} from '../admin-api/waitlist-admin-api.service';
import {calculateAge} from '../../../commons/datetime.formatter';

@Component({
  selector: 'app-waitlist-dashboard-item',
  templateUrl: './waitlist-dashboard-item.component.html',
  styleUrls: ['./waitlist-dashboard-item.component.scss'],
})
export class WaitlistDashboardItemComponent {
  internalUserPwd!: { user: string; pwd: string };
  showStatisticsDialog = false;
  private data!: WaitlistItemWithRegistrations;

  constructor(
    private waitlistAdminApi: WaitlistAdminApiService,
    private route: ActivatedRoute,
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
    this.router.navigate(['..', 'contracts'], {state: {person: waitlistRecord}, relativeTo: this.route});
  }

  public ignore(idx: number, waitlistRecord: AdminWaitlistRecord) {
    const data = this.credentials;
    const item = this.data.registrations[idx];
    this.waitlistAdminApi
        .ignoreWaitlistItem(data.user, data.pwd, item)
        .subscribe(() => (waitlistRecord.done_internal = 1));
  }

  public done(idx: number, waitlistRecord: AdminWaitlistRecord) {
    const data = this.credentials;
    const item = this.data.registrations[idx];
    this.waitlistAdminApi.removeWaitlistItem(data.user, data.pwd, item)
        .subscribe(() => this.removeRegistration(idx));
  }

  displayAgeInformation(birthday: string): string {
    return `(${(calculateAge(birthday))} Jahre)`;
  }

  private removeRegistration(idx: number): void {
    this.data?.registrations.splice(idx, 1);
  }
}
