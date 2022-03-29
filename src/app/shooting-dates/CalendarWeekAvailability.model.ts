import {Color, ShootingDateEntry} from './api/ShootingDateEntry';
import * as dayjs from 'dayjs';
import {CalendarWeek} from './CalendarWeek.model';

export class CalendarWeekAvailability {

  calendarWeek: CalendarWeek;
  private color: Color = Color.GREEN;
  private text?: string;

  constructor(date: dayjs.Dayjs) {
    this.calendarWeek = new CalendarWeek(date);
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

  getColor(): Color {
    return this.color;
  }

  private processInternal(event: ShootingDateEntry) {
    if (event.kw !== this.calendarWeek.kw()) {
      return;
    }
    if (!event.isShooting) {
      this.color = Color.ORANGE;
    }
    else if (this.color === Color.GREEN) {
      this.color = Color.RED;
    }
    this.text = event.text;

  }

  private finalize(event: Array<CalendarWeekAvailability>, idx: number) {

    this.markYellow(event, idx);
  }


  private markYellow(event: Array<CalendarWeekAvailability>, idx: number) {
    if (idx > event.length || this.color !== Color.GREEN) {
      return;
    }

    const next = this.calendarWeek.next();
    const prev = this.calendarWeek.prev();

    const shouldChangeToYellow = event
      .filter(e => e.calendarWeek.equals(next) || e.calendarWeek.equals(prev))
      .some(e => e.color === Color.RED);

    if (shouldChangeToYellow) {
      this.color = Color.YELLOW;
    }
  }
}
