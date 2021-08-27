import {Component, Input} from '@angular/core';
import {WaitlistItemWithRegistrations} from '../../admin-api/waitlist-admin-api';
import {WaitlistAdminApiService} from '../../admin-api/waitlist-admin-api.service';
import {WaitlistRecord} from '../../api/waitlist-api';

@Component({
  selector: 'app-waitlist-admin-item',
  templateUrl: './waitlist-admin-item.component.html',
  styleUrls: ['./waitlist-admin-item.component.scss'],
})
export class WaitlistAdminItemComponent {
  private data: WaitlistItemWithRegistrations | null;

  constructor(
    private waitlistAdminApi: WaitlistAdminApiService,
  ) {
  }

  get item(): WaitlistItemWithRegistrations | null {
    return this.data;
  }

  @Input() set item(value: WaitlistItemWithRegistrations) {
    this.data = value;
  }

  public createContract(idx: number, waitlistRecord: WaitlistRecord) {

  }

  public ignore(idx: number, waitlistRecord: WaitlistRecord) {

    this.removeRegistration(idx);
  }

  public done(idx: number, waitlistRecord: WaitlistRecord) {

    this.removeRegistration(idx);
  }

  private removeRegistration(idx: number): void {
    this.data.registrations.splice(idx, 1);
  }
}
