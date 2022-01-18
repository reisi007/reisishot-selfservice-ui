import {Component, Input, OnInit} from '@angular/core';
import {UserContract, Userdata} from '../api/waitlist-api';
import {WaitlistApiService} from '../api/waitlist-api.service';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-show-all-contracts',
  templateUrl: './show-all-contracts.component.html',
  styleUrls: ['./show-all-contracts.component.scss'],
})
export class ShowAllContractsComponent implements OnInit {

  @Input() auth!: Userdata;

  data: Array<UserContract> = [];

  constructor(
    private waitlistApi: WaitlistApiService,
  ) {
  }


  ngOnInit(): void {
    this.waitlistApi.loadUserContracts(this.auth)
        .subscribe(data => this.data = data);
  }

  formatDate(due_date: string): string {
    return dayjs(due_date).format('DD.MM.YYYY HH:mm');
  }
}
