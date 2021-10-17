import {Component, Input, OnInit} from '@angular/core';
import {ExtMatomoTracker} from '../../commons/ExtMatomoTracker';
import {MatomoTracker} from '@ngx-matomo/tracker';

@Component({
  selector: 'app-referrer-info-top',
  templateUrl: './referrer-info-top.component.html',
  styleUrls: ['./referrer-info-top.component.scss'],
})
export class ReferrerInfoTopComponent implements OnInit {

  private _email!: string;

  private matomo: ExtMatomoTracker;

  constructor(matomo: MatomoTracker) {
    this.matomo = new ExtMatomoTracker(matomo);
  }

  get referrer(): string {
    return this._email;
  }

  @Input() set referrer(referrer: string) {
    this._email = referrer;
  }

  ngOnInit(): void {
    this.matomo.trackEvent('referral', 'open', this.referrer);
  }

}
