import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WaitlistApiService} from '../../api/waitlist-api.service';
import {WaitlistPerson} from '../../api/waitlist-api';
import {DatefieldSupport} from '../../../commons/datefield-support';
import {ActivatedRoute, Params} from '@angular/router';
import {MatomoTracker} from '@ngx-matomo/tracker';
import {ExtMatomoTracker} from '../../../commons/ExtMatomoTracker';
import {Referrable} from '../../referral-api/referral-api.model';

const CATEGORY_REFERRAL = 'referral';
const CATEGORY_REGISTER = 'register';

@Component({
  selector: 'app-waitlist-person',
  templateUrl: './waitlist-person.component.html',
  styleUrls: ['./waitlist-person.component.scss'],
})
export class WaitlistPersonComponent extends DatefieldSupport implements OnInit {
  email!: FormGroup;
  matomo: ExtMatomoTracker;

  formSubmitted = false;
  errorLogin = false;
  errorRegister = false;

  constructor(
    formBuilder: FormBuilder,
    private apiService: WaitlistApiService,
    private route: ActivatedRoute,
    matomo: MatomoTracker,
  ) {
    super(formBuilder);
    this.matomo = new ExtMatomoTracker(matomo);
  }

  private static setReferrer(fg: FormGroup, routeData: Params) {
    fg.get('referrer')?.setValue(routeData['referrer']);
  }

  ngOnInit(): void {
    this.buildForm();
    this.email = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      referrer: this.formBuilder.control(undefined),
    });

    this.route.params.subscribe(routeData => {
      WaitlistPersonComponent.setReferrer(this.email, routeData);
      WaitlistPersonComponent.setReferrer(this.person, routeData);
    });
  }

  doRegister(): void {
    const person = this.person.getRawValue() as WaitlistPerson;
    this.apiService.register(person).subscribe(() => {
      const action = 'register';
      if (person.referrer) {
        this.matomo.trackEvent(CATEGORY_REFERRAL, action, person.referrer);
      }
      this.matomo.trackEvent(CATEGORY_REGISTER, action, person.email);
      this.formSubmitted = true;
    });

  }

  doLogin(): void {
    const email = this.email.getRawValue() as { email: string } & Referrable;

    this.apiService.login(email).subscribe(
      () => {
        const action = 'login';
        if (email.referrer) {
          this.matomo.trackEvent(CATEGORY_REFERRAL, action, email.referrer);
        }
        this.matomo.trackEvent(CATEGORY_REGISTER, action, email.email);
        this.formSubmitted = true;
      },
      () => this.errorLogin = true,
    );
  }
}
