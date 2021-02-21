import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent implements OnInit {

  @Input()
  cnt: number;

  @Input()
  person: AbstractControl;

  constructor() {
  }

  ngOnInit(): void {
    this.registerAgeCalculation();
  }

  private registerAgeCalculation(): void {
    const birthday = this.person.get('birthday');
    const age = this.person.get('age');
    birthday
      .valueChanges
      .subscribe((val: string) => {
        const newAge = dayjs()
          .diff(dayjs(val), 'year', true)
          .toFixed(2);
        age.setValue(newAge);
      });
  }

}
