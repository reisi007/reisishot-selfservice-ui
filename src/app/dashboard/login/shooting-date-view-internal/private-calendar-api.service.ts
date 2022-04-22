import {Observable} from 'rxjs';
import {ApiService} from '../../../commons/ApiService';
import {HttpClient} from '@angular/common/http';
import {AdminLoginDataService} from '../admin-login-data.service';
import {ShootingDateEntry} from '../../../shooting-dates/api/ShootingDateEntry';
import {Injectable} from '@angular/core';

@Injectable()
export class PrivateCalendarApiService extends ApiService {

  constructor(
    private http: HttpClient,
    private loginService: AdminLoginDataService,
  ) {
    super();
  }

  public getPrivateShootingDates(): Observable<Array<ShootingDateEntry>> {
    const userData = this.loginService.dataOrError;

    return this.http.get<Array<ShootingDateEntry>>(
      ApiService.buildUrl('api', 'shooting_dates_private_get.php'), {
        headers: ApiService.buildHeaders(userData.user, userData.pwd),
      },
    );
  }
}
