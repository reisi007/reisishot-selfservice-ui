import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WaitlistApiService} from '../../api/waitlist-api.service';
import {WaitlistPerson} from '../../api/waitlist-api';
import {DatefieldSupport} from '../../../commons/datefield-support';

@Component({
  selector: 'app-waitlist-person',
  templateUrl: './waitlist-person.component.html',
  styleUrls: ['./waitlist-person.component.scss'],
})
export class WaitlistPersonComponent extends DatefieldSupport implements OnInit {

  person: FormGroup;
  email: FormGroup;

  formSubmitted = false;
  errorLogin = false;
  errorRegister = false;

  constructor(
    formBuilder: FormBuilder,
    private apiService: WaitlistApiService,
  ) {
    super(formBuilder);
  }

  ngOnInit(): void {
    this.buildForm();
    this.email = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
    });
    this.setupDateField('birthday');
  }

  doRegister() {
    const person = this.person.getRawValue() as WaitlistPerson;
    this.apiService.register(person)
        .subscribe(() => this.formSubmitted = true);
  }

  doLogin() {
    this.apiService.login(this.person.get('email').value)
        .subscribe(
          () => this.formSubmitted = true,
          () => this.errorLogin = true,
        );
  }
}
