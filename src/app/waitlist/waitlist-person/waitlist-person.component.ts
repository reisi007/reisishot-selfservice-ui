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

  constructor() {
  }

  ngOnInit(): void {
  }

}
