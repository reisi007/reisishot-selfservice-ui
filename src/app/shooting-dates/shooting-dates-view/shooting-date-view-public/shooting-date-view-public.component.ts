import {Component, Input} from '@angular/core';
import {CalendarApiService} from '../../api/calendar-api.service';
import {Observable} from 'rxjs';
import {ShootingDateEntry} from '../../api/ShootingDateEntry';

@Component({
  selector: 'app-shooting-date-view-public',
  templateUrl: './shooting-date-view-public.component.html',
  styleUrls: ['./shooting-date-view-public.component.scss'],
})
export class ShootingDateViewPublicComponent {

  constructor(private apiService: CalendarApiService) {
  }

  _weeks = 12;

  get weeks(): number {
    return this._weeks;
  }

  @Input()
  set weeks(weeks: number) {
    this._weeks = weeks;
  }

  getData: () => Observable<ShootingDateEntry[]> = () => this.apiService.getShootingDates();

}
