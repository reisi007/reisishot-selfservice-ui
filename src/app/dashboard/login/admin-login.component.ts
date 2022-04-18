import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent {

  readonly min = 4;
  readonly max = 20;

  weekForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.weekForm = this.formBuilder.group({
      'weeks': this.formBuilder.control(8, [Validators.min(this.min), Validators.max(this.max)]),
    });
  }

  get weeks(): number {
    return this.weekForm?.get('weeks')?.value;
  }

}
