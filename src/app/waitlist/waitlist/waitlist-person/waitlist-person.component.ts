import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-waitlist-person',
  templateUrl: './waitlist-person.component.html',
  styleUrls: ['./waitlist-person.component.scss'],
})
export class WaitlistPersonComponent implements OnInit {

  @Input()
  person: AbstractControl;

  dateFieldType: { [key: string]: string | null } = {};

  constructor() {
  }

  ngOnInit(): void {
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
}
