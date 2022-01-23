import {Component, Input, OnInit} from '@angular/core';
import {WaitlistAdminApiService} from '../admin-api/waitlist-admin-api.service';
import {PendingSignaturInformation} from '../admin-api/waitlist-admin-api';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-pending-signatures',
  templateUrl: './pending-signatures.component.html',
  styleUrls: ['./pending-signatures.component.scss'],
})
export class PendingSignaturesComponent implements OnInit {

  data?: Array<PendingSignaturInformation>;

  constructor(
    private apiService: WaitlistAdminApiService,
  ) {
  }

  _credentials!: { user: string; pwd: string };

  get credentials(): { user: string; pwd: string } {
    return this._credentials;
  }

  @Input() set credentials(value: { user: string; pwd: string }) {
    this._credentials = value;
  }

  ngOnInit(): void {
    this.apiService.loadPendingSignatures(this.credentials.user, this.credentials.pwd).subscribe(
      data => this.data = data,
    );
  }

  formatDate(dueDate: string): string {
    return dayjs(dueDate).format('DD.MM.YYYY HH:mm');
  }

  computeUrl(item: { email: string; access_key: string }) {
    return `https://${window.location.host}/contracts/${item.email}/${item.access_key}`;
  }
}
