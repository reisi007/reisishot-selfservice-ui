import {Component, Input} from '@angular/core';
import * as dayjs from 'dayjs';
import * as isoWeekPlugin from 'dayjs/plugin/isoWeek';

dayjs.extend(isoWeekPlugin);

@Component({
  selector: 'app-shooting-date-public-cell',
  templateUrl: './shooting-date-public-cell.component.html',
  styleUrls: ['./shooting-date-public-cell.component.scss'],
})
export class ShootingDateCellComponent {


  constructor() {
  }

  _kw: number = 0;

  get kw(): number {
    return this._kw;
  }

  @Input()
  set kw(input: number) {
    this._kw = input;
  }

  displayDateByKw(kw: number): string {
    const curKw = dayjs().isoWeek();
    const baseDate = kw < curKw ? dayjs().add(1, 'year') : dayjs();

    return baseDate
      .day(1) // Monday
      .isoWeek(kw)
      .format('DD.MM.YYYY');
  }

}
