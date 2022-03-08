import {Component, Input, OnInit} from '@angular/core';
import {Color, ShootingDateDisplayEntry, ShootingDateEntry} from '../api/ShootingDateEntry';
import {ShootingDateApiService} from '../api/shooting-date-api.service';
import * as dayjs from 'dayjs';
import * as isoWeekPlugin from 'dayjs/plugin/isoWeek';

dayjs.extend(isoWeekPlugin);

@Component({
  selector: 'app-shooting-dates-view',
  templateUrl: './shooting-dates-view.component.html',
  styleUrls: ['./shooting-dates-view.component.scss'],
})
export class ShootingDatesViewComponent implements OnInit {

  data?: Array<ShootingDateDisplayEntry>;

  constructor(
    private shootingDateService: ShootingDateApiService,
  ) {
  }

  _weeks = 12;

  get weeks(): number {
    return this._weeks;
  }

  @Input()
  set weeks(weeks: number | string | undefined) {
    if (weeks) {
      if (typeof weeks === 'number') {
        this._weeks = weeks;
      }
      else {
        this._weeks = parseInt(weeks, 10);
      }
    }
    this.updateShootingDates();
  }

  trackByKw = (index: number, item: ShootingDateDisplayEntry) => item.kw;

  ngOnInit(): void {
    this.updateShootingDates();
  }

  displayDateByKw(kw: number): string {
    const curKw = dayjs().isoWeek();
    const baseDate = kw < curKw ? dayjs().add(1, 'year') : dayjs();

    return baseDate
      .day(1) // Monday
      .isoWeek(kw)
      .format('DD.MM.YYYY');
  }

  private updateShootingDates() {
    this.shootingDateService.getShootingDates()
        .subscribe({
          next: data => this.data = this.prepareDate(data, this.weeks),
        });
  }

  private prepareDate(values: Array<ShootingDateEntry>, weeks: number): Array<ShootingDateDisplayEntry> {
    const computedValues = new Array<ShootingDateDisplayEntry>();
    const curWeek = dayjs().isoWeek();
    const lastWeek = curWeek + weeks;

    function initWeeks() {
      for (let i = 0; i < weeks; i++) {
        computedValues.push({
          kw: curWeek + i,
          color: Color.GREEN,
        });
      }
    }

    function markWeeksUsingCalendarData() {
      values.forEach((cur) => {
        const kw = cur.kw;
        const computedIdx = kw - curWeek;

        if (curWeek <= kw && kw < lastWeek) {
          const curComputedValue = computedValues[computedIdx];
          if (!cur.isShooting) {
            curComputedValue.color = Color.ORANGE;
          }
          else if (curComputedValue.color === Color.GREEN) {
            curComputedValue.color = Color.RED;
          }
        }
      });
    }

    function markWeeksBetweenShootingsAsYellow() {
      function safeAccess(array: Array<ShootingDateDisplayEntry>, idx: number, offset: number): ShootingDateDisplayEntry | undefined {
        const realIdx = idx - offset;
        if (0 <= realIdx && realIdx < array.length) {
          return array[realIdx];
        }
        return undefined;
      }

      for (let i = 0; i < weeks; i++) {
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
    }

    // Set all green
    initWeeks();
    // Mark Shootings
    markWeeksUsingCalendarData();
    // Post process
    markWeeksBetweenShootingsAsYellow();

    return computedValues;
  }
}
