import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {ShootingDateEntry, ShootingSlotState} from '../api/ShootingDateEntry';
import * as dayjs from 'dayjs';
import {Observable} from 'rxjs';
import {CalendarWeekAvailability} from '../CalendarWeekAvailability.model';

@Component({
  selector: 'app-shooting-dates-internal',
  templateUrl: './shooting-dates-internal.component.html',
  styleUrls: ['./shooting-dates-internal.component.scss'],
})
export class ShootingDatesViewComponent implements OnInit {

  data?: Array<CalendarWeekAvailability>;
  @Input() calendarEntryProvider!: () => Observable<ShootingDateEntry[]>;

  constructor() {
  }

  private _weeks = 0;

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

  trackByKw = (index: number, item: CalendarWeekAvailability) => item.calendarWeek.id();

  ngOnInit(): void {
    this.updateShootingDates();
  }


  private updateShootingDates() {
    this.calendarEntryProvider()
        .subscribe({
          next: data => this.data = this.prepareDate(data, this.weeks),
        });
  }

  private prepareDate(values: Array<ShootingDateEntry>, displayedWeeks: number): Array<CalendarWeekAvailability> {
    const calculationOffset = 1;
    const startWeek = dayjs()
      .add(-calculationOffset, 'weeks');
    const weeks = displayedWeeks + 2 * calculationOffset;

    // Set all green
    const computedValues = new Array<CalendarWeekAvailability>();
    for (let i = 0; i < weeks; i++) {
      computedValues.push(
        new CalendarWeekAvailability(startWeek.add(i, 'weeks')),
      );
    }

    values.forEach(event => {
      computedValues.forEach((consumer, idx) => {
        consumer.process(event);
      });
    });

    computedValues.forEach((consumer, idx) => consumer.process(computedValues, idx));
    computedValues.forEach((consumer) => consumer.process(computedValues, computedValues.length));

    return computedValues.slice(calculationOffset, -calculationOffset);
  }

  getCellColor(state: ShootingSlotState): string {
    switch(state) {
      case ShootingSlotState.BLOCKED:
        return 'text-white bg-gray-500';
      case ShootingSlotState.BUSY:
        return 'text-black bg-yellow-300';
      case ShootingSlotState.FREE:
        return 'text-white bg-reisishot';
      case ShootingSlotState.TAKEN:
        return 'text-white bg-red-500';
      case ShootingSlotState.NOT_YET_OPENED:
        return 'text-gray-700 bg-gray-300';
      default:
        return neverException(state);
    }
  }
}

function neverException(e: never): never {
  throw Error('This should never happen: ' + e);
}
