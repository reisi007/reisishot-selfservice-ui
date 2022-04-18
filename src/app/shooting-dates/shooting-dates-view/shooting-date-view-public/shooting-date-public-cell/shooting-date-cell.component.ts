import {Component, Input} from '@angular/core';
import * as dayjs from 'dayjs';
import * as isoWeekPlugin from 'dayjs/plugin/isoWeek';
import {CalendarWeekAvailability} from '../../../CalendarWeekAvailability.model';

dayjs.extend(isoWeekPlugin);

@Component({
  selector: 'app-shooting-date-public-cell',
  templateUrl: './shooting-date-public-cell.component.html',
  styleUrls: ['./shooting-date-public-cell.component.scss'],
})
export class ShootingDateCellComponent {

  @Input()
  availability!: CalendarWeekAvailability;

  constructor() {
  }

}
