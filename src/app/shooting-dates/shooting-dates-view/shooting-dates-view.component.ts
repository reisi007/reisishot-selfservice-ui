import {Component, OnInit} from '@angular/core';
import {Color, ShootingDateDisplayEntry, ShootingDateEntry} from '../api/ShootingDateEntry';
import {ShootingDateApiService} from '../api/shooting-date-api.service';
import * as dayjs from 'dayjs';
import * as isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isoWeek);

@Component({
  selector: 'app-shooting-dates-view',
  templateUrl: './shooting-dates-view.component.html',
  styleUrls: ['./shooting-dates-view.component.scss'],
})
export class ShootingDatesViewComponent implements OnInit {

  data?: Array<ShootingDateDisplayEntry>;
  readonly weekInAdvance = 8;

  constructor(
    private shootingDateService: ShootingDateApiService,
  ) {
  }

  trackByKw = (index: number, item: ShootingDateDisplayEntry) => item.kw;

  ngOnInit(): void {
    this.shootingDateService.getShootingDates().subscribe({
      next: value => this.data = this.prepareDate(value),
    });
  }

  displayDateByKw(kw: number) {
    const curKw = dayjs().isoWeek();
    const date =
      kw < curKw ?
      dayjs().add(1, 'year').isoWeek(kw) :
      dayjs().isoWeek(kw);

    return date.format('DD.MM.YYYY');
  }

  private prepareDate(values: Array<ShootingDateEntry>): Array<ShootingDateDisplayEntry> {
    const computedValues = new Array<ShootingDateDisplayEntry>();
    const curWeek = dayjs().isoWeek();

    // Set all green
    for (let i = 0; i < this.weekInAdvance; i++) {
      computedValues.push({
        kw: curWeek + i,
        color: Color.GREEN,
      });
    }

    const lastWeek = curWeek + this.weekInAdvance;

    // Mark Shootings
    values.forEach((cur) => {
      const kw = cur.kw;
      const computedIdx = kw - curWeek;

      if (curWeek <= kw && kw < lastWeek) {
        computedValues[computedIdx].color = cur.isShooting ? Color.RED : Color.ORANGE;
      }
    });

    function safeAccess(array: Array<ShootingDateDisplayEntry>, idx: number, offset: number) {
      const realIdx = idx - offset;
      if (0 <= realIdx && realIdx < array.length) {
        return array[realIdx];
      }
      return undefined;
    }

    // Post process
    for (let i = 0; i < this.weekInAdvance; i++) {
      const cur = computedValues[i];
      if (cur.color === Color.GREEN) {
        let redFound = false;
        let checked = safeAccess(computedValues, i, -1);
        if (checked) {
          redFound = checked.color === Color.RED;
        }
        if (!redFound) {
          checked = safeAccess(computedValues, i, 1);
          if (checked) {
            redFound = checked.color === Color.RED;
          }
        }

        if (redFound) {
          cur.color = Color.YELLOW;
        }
      }
    }
    return computedValues;
  }
}