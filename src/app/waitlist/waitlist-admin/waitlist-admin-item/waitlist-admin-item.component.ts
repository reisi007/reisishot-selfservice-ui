import {Component, Input} from '@angular/core';
import {WaitlistItemWithRegistrations} from '../../admin-api/waitlist-admin-api';
import {WaitlistAdminApiService} from '../../admin-api/waitlist-admin-api.service';
import {WaitlistRecord} from '../../api/waitlist-api';
import {Router} from '@angular/router';

@Component({
  selector: 'app-waitlist-admin-item',
  templateUrl: './waitlist-admin-item.component.html',
  styleUrls: ['./waitlist-admin-item.component.scss'],
})
export class WaitlistAdminItemComponent {
  private data: WaitlistItemWithRegistrations | null;

  constructor(
    private waitlistAdminApi: WaitlistAdminApiService,
    private router: Router,
  ) {
  }

  get item(): WaitlistItemWithRegistrations | null {
    return this.data;
  }

  @Input() set item(value: WaitlistItemWithRegistrations) {
    this.data = value;
  }

  public createContract(idx: number, waitlistRecord: WaitlistRecord) {
    this.router.navigate(['contracts'], {state: {person: waitlistRecord}});
  }

  public ignore(idx: number, waitlistRecord: WaitlistRecord) {
    // TODO implementation

    this.removeRegistration(idx);
  }

  public done(idx: number, waitlistRecord: WaitlistRecord) {
    // TODO implementation

    this.removeRegistration(idx);
  }

  private removeRegistration(idx: number): void {
    this.data.registrations.splice(idx, 1);
  }
}
