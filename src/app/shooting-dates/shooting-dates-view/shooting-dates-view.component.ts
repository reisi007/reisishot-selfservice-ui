import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {Color, ShootingDateDisplayEntry, ShootingDateEntry} from '../api/ShootingDateEntry';
import * as dayjs from 'dayjs';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-shooting-dates-internal',
  templateUrl: './shooting-dates-internal.component.html',
  styleUrls: ['./shooting-dates-internal.component.scss'],
})
export class ShootingDatesViewComponent implements OnInit {

  data?: Array<ShootingDateDisplayEntry>;
  @Input() calendarEntryProvider!: () => Observable<ShootingDateEntry[]>;

  constructor() {
  }

  _weeks = 0;

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

  _cellTemplate: TemplateRef<any> | null = null;

  get cellTemplate(): TemplateRef<any> | null {
    return this._cellTemplate;
  }

  @Input()
  set cellTemplate(template: TemplateRef<any> | null) {
    if (template) {
      this._cellTemplate = template;
    }
  }

  trackByKw = (index: number, item: ShootingDateDisplayEntry) => item.kw;

  ngOnInit(): void {
    this.updateShootingDates();
  }


  private updateShootingDates() {
    this.calendarEntryProvider()
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
          const curComputedValue = {...cur, ...computedValues[computedIdx]};
          computedValues[computedIdx] = curComputedValue;
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
