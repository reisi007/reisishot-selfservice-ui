import {ShootingDateEntry, ShootingSlotState} from './api/ShootingDateEntry';
import * as dayjs from 'dayjs';
import {CalendarWeek} from './CalendarWeek.model';

export class CalendarWeekAvailability {
  calendarWeek: CalendarWeek;
  private color = ShootingSlotState.FREE;
  private text?: string;

  constructor(date: dayjs.Dayjs) {
    this.calendarWeek = new CalendarWeek(date);
  }

  private static isFinalRun(event: Array<CalendarWeekAvailability>, idx: number) {
    return idx > event.length;
  }

  process(event: Array<CalendarWeekAvailability>, index: number): void;

  process(event: ShootingDateEntry): void;

  process(event: Array<CalendarWeekAvailability> | ShootingDateEntry, index: number | undefined = undefined): void {
    if (Array.isArray(event)) {
      if (index === undefined) {
        throw Error('Index must be defined');
      }
      this.finalize(event, index);
    }
    else {
      this.processInternal(event);
    }
  }

  isFree() {
    return this.color === ShootingSlotState.FREE;
  }

  isBusy() {
    return this.color === ShootingSlotState.BUSY;
  }

  isTaken() {
    return this.color === ShootingSlotState.TAKEN;
  }

  isBlocked() {
    return this.color === ShootingSlotState.BLOCKED;
  }

  private processInternal(event: ShootingDateEntry) {
    if (event.kw !== this.calendarWeek.kw()) {
      return;
    }

    this.text = event.text;
    this.color = event.state;
  }

  private finalize(event: Array<CalendarWeekAvailability>, idx: number) {
    this.markFreeWeeksBetweenShootingsAsBusy(event, idx);
  }

  private markFreeWeeksBetweenShootingsAsBusy(event: Array<CalendarWeekAvailability>, idx: number) {
    if (CalendarWeekAvailability.isFinalRun(event, idx) || !this.isFree()) {
      return;
    }

    const next = this.calendarWeek.next();
    const prev = this.calendarWeek.prev();

    const shouldChangeToYellow = event
      .filter(e => e.calendarWeek.equals(next) || e.calendarWeek.equals(prev))
      .some(e => e.color === ShootingSlotState.TAKEN);

    if (shouldChangeToYellow) {
      this.color = ShootingSlotState.BUSY;
    }
  }


}
