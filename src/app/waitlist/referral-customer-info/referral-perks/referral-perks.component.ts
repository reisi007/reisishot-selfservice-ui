import {Component, Input, OnInit} from '@angular/core';
import {Perk} from '../../referral-api/referral-api.model';
import {ReferralApiService} from '../../referral-api/referral-api.service';

@Component({
  selector: 'app-referral-perks',
  templateUrl: './referral-perks.component.html',
  styleUrls: ['./referral-perks.component.scss'],
})
export class ReferralPerksComponent implements OnInit {

  @Input()
  curPoints!: number;

  perks?: Array<Perk>;

  constructor(
    private referralApi: ReferralApiService,
  ) {
  }

  ngOnInit(): void {
    this.referralApi.loadPerks()
        .subscribe(data => {
          this.perks = data;
        });
  }

}
