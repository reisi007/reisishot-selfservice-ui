import {Injectable} from '@angular/core';
import {ApiService} from '../../commons/ApiService';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ShootingDateEntry} from './ShootingDateEntry';

@Injectable({
  providedIn: 'root',
})
export class ShootingDateApiService extends ApiService {

  constructor(private http: HttpClient) {
    super();
  }

  public getShootingDates(): Observable<Array<ShootingDateEntry>> {
    return this.http.get<Array<ShootingDateEntry>>(
      ApiService.buildUrl('api', 'shooting_dates_get.php'),
    );
  }
}
