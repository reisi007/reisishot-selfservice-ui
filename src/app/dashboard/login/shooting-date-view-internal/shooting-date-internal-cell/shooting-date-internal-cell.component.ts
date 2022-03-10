import {Component, Input} from '@angular/core';
import {CalendarApiService} from '../../../../shooting-dates/api/calendar-api.service';
import {AdminLoginService} from '../../admin-login.service';

@Component({
  selector: 'app-shooting-date-internal-cell',
  templateUrl: './shooting-date-internal-cell.component.html',
  styleUrls: ['./shooting-date-internal-cell.component.scss'],
})
export class ShootingDateInternalCellComponent {

  constructor(
    private apiService: CalendarApiService,
    private loginService: AdminLoginService,
  ) {
  }

  _kw = 12;

  get kw(): number {
    return this._kw;
  }

  @Input()
  set kw(weeks: number) {
    this._kw = weeks;
  }

  _text = '';

  get text(): string {
    return this._text;
  }

  @Input()
  set text(text: string) {
    this._text = text;
  }

}
