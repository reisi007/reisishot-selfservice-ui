import {ShootingDateEntry, ShootingSlotState} from './api/ShootingDateEntry';
import * as dayjs from 'dayjs';
import {CalendarWeek} from './CalendarWeek.model';

export class CalendarWeekAvailability {
  private readonly _calendarWeek: CalendarWeek;

  constructor(calendarWeek: CalendarWeek, state: ShootingSlotState, text?: string)
  constructor(date: dayjs.Dayjs)
  constructor(first: CalendarWeek | dayjs.Dayjs, state?: ShootingSlotState, text?: string) {
    if (!first) {
      throw Error('First param must be a dayjs.Date or a CalendarWeek');
    }

    if (first instanceof CalendarWeek) {
      this._calendarWeek = first;

      if (state) {
        this._state = state;
      }
      this._text = text;
    }
    else {
      this._calendarWeek = new CalendarWeek(first);
    }
  }

  get calendarWeek(): CalendarWeek {
    return this._calendarWeek;
  }

  private _state: ShootingSlotState = ShootingSlotState.FREE;

  get state(): ShootingSlotState {
    return this._state;
  }

  private _text?: string;

  get text(): string | undefined {
    return this._text;
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
    return this._state === ShootingSlotState.FREE;
  }

  isBusy() {
    return this._state === ShootingSlotState.BUSY;
  }

  isTaken() {
    return this._state === ShootingSlotState.TAKEN;
  }

  isBlocked() {
    return this._state === ShootingSlotState.BLOCKED;
  }

  withText(text: string | undefined = this._text): CalendarWeekAvailability {
    return new CalendarWeekAvailability(this.calendarWeek, this.state, text);
  }

  private processInternal(event: ShootingDateEntry) {
    if (event.kw !== this._calendarWeek.kw()) {
      return;
    }

    this._text = event.text;
    this._state = event.state;
  }

  private finalize(event: Array<CalendarWeekAvailability>, idx: number) {
    this.markFreeWeeksBetweenShootingsAsBusy(event, idx);
  }

  private markFreeWeeksBetweenShootingsAsBusy(event: Array<CalendarWeekAvailability>, idx: number) {
    if (CalendarWeekAvailability.isFinalRun(event, idx) || !this.isFree()) {
      return;
    }

    const next = this._calendarWeek.next();
    const prev = this._calendarWeek.prev();

    const shouldChangeToYellow = event
      .filter(e => e._calendarWeek.equals(next) || e._calendarWeek.equals(prev))
      .some(e => e._state === ShootingSlotState.TAKEN);

    if (shouldChangeToYellow) {
      this._state = ShootingSlotState.BUSY;
    }
  }
}
