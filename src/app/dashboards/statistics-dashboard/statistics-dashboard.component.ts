import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-statistics-dashboard',
  templateUrl: './statistics-dashboard.component.html',
  styleUrls: ['./statistics-dashboard.component.scss'],
})
export class StatisticsDashboardComponent {

  formShooting: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.formShooting = formBuilder.group({
      'showMinor': formBuilder.control(true),
      'showGroups': formBuilder.control(true),
    });
  }

  get shootingFormValue(): ShootingFormValue {
    return this.formShooting.value;
  }
}

export type ShootingFormValue = { showMinor: boolean, showGroups: boolean }
