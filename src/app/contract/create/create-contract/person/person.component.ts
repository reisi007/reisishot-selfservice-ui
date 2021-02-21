import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl} from '@angular/forms';

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
  }

  /* Keep example of dayjs age calculation for now
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
   */

}
