import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WaitlistApiService} from '../../api/waitlist-api.service';
import {WaitlistPerson} from '../../api/waitlist-api';
import {DatefieldSupport} from '../../../commons/datefield-support';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-waitlist-person',
  templateUrl: './waitlist-person.component.html',
  styleUrls: ['./waitlist-person.component.scss'],
})
export class WaitlistPersonComponent extends DatefieldSupport implements OnInit {
  email!: FormGroup;

  formSubmitted = false;
  errorLogin = false;
  errorRegister = false;

  constructor(
    formBuilder: FormBuilder,
    private apiService: WaitlistApiService,
    private route: ActivatedRoute,
  ) {
    super(formBuilder);
  }

  private static setReferrer(fg: FormGroup, routeData: Params) {
    fg.get('referrer')?.setValue(routeData.referrer);
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

    this.setupDateField('birthday');
  }

  doRegister(): void {
    const person = this.person.getRawValue() as WaitlistPerson;
    this.apiService.register(person).subscribe(() => (this.formSubmitted = true));
  }

  doLogin(): void {
    const email = this.email.getRawValue() as { email: string, referrer: string };
    this.apiService.login(email).subscribe(
      () => (this.formSubmitted = true),
      () => (this.errorLogin = true),
    );
  }
}
