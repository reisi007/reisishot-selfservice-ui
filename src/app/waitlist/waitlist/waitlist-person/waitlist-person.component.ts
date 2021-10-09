import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WaitlistApiService} from '../../api/waitlist-api.service';
import {beforeNow} from '../../../commons/datetime.validator';
import {WaitlistPerson} from '../../api/waitlist-api';

@Component({
  selector: 'app-waitlist-person',
  templateUrl: './waitlist-person.component.html',
  styleUrls: ['./waitlist-person.component.scss'],
})
export class WaitlistPersonComponent implements OnInit {

  person: FormGroup;

  dateFieldType: { [key: string]: string | null } = {};

  formSubmitted = false;
  errorLogin = false;
  errorRegister = false;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: WaitlistApiService,
  ) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.setupDateField('birthday');
  }

  setupDateField(fieldName: string) {
    const value = this.person.get(fieldName).value;
    if (value == null || (typeof value === 'string' && value.trim() === '')) {
      this.dateFieldType[fieldName] = 'text';
    }
    else {
      this.dateFieldType[fieldName] = 'date';
    }
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

  private buildForm() {
    this.person = this.formBuilder.group({
      firstName: this.formBuilder.control('', [Validators.required]),
      lastName: this.formBuilder.control('', [Validators.required]),
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      birthday: this.formBuilder.control('', [Validators.required, beforeNow]),
      availability: this.formBuilder.control('', [Validators.required]),
      phone_number: this.formBuilder.control('', [Validators.required, Validators.pattern('\\+?\\d{5,}')]),
      website: this.formBuilder.control(''),
    });
  }


}
