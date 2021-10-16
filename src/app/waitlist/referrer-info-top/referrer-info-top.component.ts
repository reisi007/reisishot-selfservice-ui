import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-referrer-info-top',
  templateUrl: './referrer-info-top.component.html',
  styleUrls: ['./referrer-info-top.component.scss'],
})
export class ReferrerInfoTopComponent {

  private _email!: string;

  constructor() {
  }

  get referrer(): string {
    return this._email;
  }

  @Input() set referrer(referrer: string) {
    this._email = referrer;
  }

}
