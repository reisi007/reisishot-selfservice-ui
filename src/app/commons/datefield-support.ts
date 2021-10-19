import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {beforeNow} from './datetime.validator';

export abstract class DatefieldSupport {
  person!: FormGroup;
  protected formBuilder: FormBuilder;

  protected constructor(formBuilder: FormBuilder) {
    this.formBuilder = formBuilder;
  }

  buildForm() {
    this.person = this.formBuilder.group({
      firstName: this.formBuilder.control('', [Validators.required]),
      lastName: this.formBuilder.control('', [Validators.required]),
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      birthday: this.formBuilder.control('', [Validators.required, beforeNow]),
      availability: this.formBuilder.control('', [Validators.required]),
      phone_number: this.formBuilder.control('', [Validators.required, Validators.pattern('\\+?\\d{5,}')]),
      website: this.formBuilder.control(''),
      referrer: this.formBuilder.control(undefined),
    });
  }
}
