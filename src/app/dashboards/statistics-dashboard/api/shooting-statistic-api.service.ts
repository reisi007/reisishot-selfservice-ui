import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../../../commons/ApiService';
import {Observable} from 'rxjs';
import {ShootingStatisticsResponsePerMonth, ShootingStatisticsResponsePerYear} from './Model';
import {AdminUserData} from '../../../dashboard/login/admin-login/AdminUserData';

@Injectable()
export class ShootingStatisticApiService extends ApiService {

  constructor(private http: HttpClient) {
    super();
  }

  public getShootingStatisticsPerYear(adminData: AdminUserData, showMinors: boolean, showGroups: boolean): Observable<ShootingStatisticsResponsePerYear> {
    const urlParam = new URLSearchParams();
    if (!showMinors) {
      urlParam.set('showMinors', 'false');
    }
    if (!showGroups) {
      urlParam.set('showGroups', 'false');
    }

    const {user, pwd} = adminData;
    return this.http.get<ShootingStatisticsResponsePerYear>(
      ApiService.buildUrl('api', 'shooting_statistics_get.php?' + urlParam.toString()), {
        headers: ApiService.buildHeaders(user, pwd),
      },
    );
  }

  public getShootingStatisticsPerMonth(adminData: AdminUserData): Observable<ShootingStatisticsResponsePerMonth> {
    return this.http.get<ShootingStatisticsResponsePerMonth>(
      ApiService.buildUrl('api', 'shooting_statistics_month_get.php'),
      {headers: ApiService.buildHeaders(adminData.user, adminData.pwd)},
    );
  }
}
