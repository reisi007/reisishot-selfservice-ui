import {Component, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {PrivateCalendarApiService} from './private-calendar-api.service';
import {ShootingDateEntry} from '../../../shooting-dates/api/ShootingDateEntry';

@Component({
  selector: 'app-shooting-date-view-internal',
  templateUrl: './shooting-date-view-internal.component.html',
  styleUrls: ['./shooting-date-view-internal.component.scss'],
})
export class ShootingDateViewInternalComponent {

  constructor(
    private apiService: PrivateCalendarApiService,
  ) {
  }

  _weeks = 12;

  get weeks(): number {
    return this._weeks;
  }

  @Input()
  set weeks(weeks: number) {
    this._weeks = weeks;
  }


  getData: () => Observable<ShootingDateEntry[]> = () => this.apiService.getPrivateShootingDates();
}
