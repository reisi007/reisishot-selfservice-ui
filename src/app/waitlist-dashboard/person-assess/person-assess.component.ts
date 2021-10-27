import {Component, Input} from '@angular/core';
import {ReferralType} from '../../waitlist/referral-api/referral-api.model';
import {ReferralApiService} from '../../waitlist/referral-api/referral-api.service';

@Component({
  selector: 'app-person-assess',
  templateUrl: './person-assess.component.html',
  styleUrls: ['./person-assess.component.scss'],
})
export class PersonAssessComponent {

  @Input() auth!: { user: string; pwd: string };

  clickDisabled: true | null = null;

  constructor(
    private referralApi: ReferralApiService,
  ) {
  }

  _email!: string;

  get email() {
    return this._email;
  }

  @Input() set email(email: string) {
    this._email = email;
  }

  public positiv() {
    this.clickDisabled = true;

    this.referralApi.addPointsDirect(
      {
        email: this.email,
        action: ReferralType.SHOOTING_GOOD,
      }, this.auth,
    ).subscribe(() => {
      this.referralApi.addPoints({
            email: this.email,
            action: ReferralType.SHOOTING_REFERRED_GOOD,
          }, this.auth)
          .subscribe(
            () => {
              this.clickDisabled = null;
              window.alert('Positive Bewertung erfolgreich abgegeben');
            },
          );
    });
  }

  public negativ() {
    this.clickDisabled = true;

    this.referralApi.addPointsDirect(
      {
        email: this.email,
        action: ReferralType.SHOOTING_BAD,
      }
      , this.auth,
    ).subscribe(() => {
      this.referralApi.addPoints({
        email: this.email,
        action: ReferralType.SHOOTING_REFERRED_BAD,
      }, this.auth).subscribe(
        () => {
          this.clickDisabled = null;
          window.alert('Negative Bewertung erfolgreich abgegeben');
        },
      );
    });
  }

}
