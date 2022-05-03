import {Component, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {PrivateCalendarApiService} from './private-calendar-api.service';
import {ShootingDateEntry} from '../../../shooting-dates/api/ShootingDateEntry';
import {CalendarWeekAvailability} from '../../../shooting-dates/CalendarWeekAvailability.model';
import {catchError} from 'rxjs/operators';
import {AdminLoginDataService} from '../admin-login-data.service';

@Component({
  selector: 'app-shooting-date-view-internal',
  templateUrl: './shooting-date-view-internal.component.html',
  styleUrls: ['./shooting-date-view-internal.component.scss'],
})
export class ShootingDateViewInternalComponent {

  constructor(
    private apiService: PrivateCalendarApiService,
    private adminLoginDataService: AdminLoginDataService,
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

  getData: () => Observable<ShootingDateEntry[]> = () => this.apiService
                                                             .getPrivateShootingDates()
                                                             .pipe(catchError((_, caught) => {
                                                               this.adminLoginDataService.data = null;
                                                               return caught;
                                                             }));

  cwa(cur: any): CalendarWeekAvailability {
    return cur;
  }
}
