import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {beforeNow} from './datetime.validator';

export abstract class DatefieldSupport {
  person!: FormGroup;
  dateFieldType: { [key: string]: string | null } = {};
  protected formBuilder: FormBuilder;

  protected constructor(formBuilder: FormBuilder) {
    this.formBuilder = formBuilder;
  }

  setupDateField(fieldName: string) {
    const value = this.person?.get(fieldName)?.value;
    if (value == null || (typeof value === 'string' && value.trim() === '')) {
      this.dateFieldType[fieldName] = 'text';
    }
    else {
      this.dateFieldType[fieldName] = 'date';
    }
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
