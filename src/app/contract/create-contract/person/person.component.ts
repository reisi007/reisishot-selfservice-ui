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

}
