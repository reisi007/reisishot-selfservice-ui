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

  private static buildParams(showMinors: boolean, showGroups: boolean) {
    const urlParam = new URLSearchParams();
    if (!showMinors) {
      urlParam.set('showMinors', 'false');
    }
    if (!showGroups) {
      urlParam.set('showGroups', 'false');
    }
    return urlParam;
  }

  public getShootingStatisticsPerYear(adminData: AdminUserData, showMinors: boolean, showGroups: boolean): Observable<ShootingStatisticsResponsePerYear> {
    const urlParam = ShootingStatisticApiService.buildParams(showMinors, showGroups);

    const {user, pwd} = adminData;
    return this.http.get<ShootingStatisticsResponsePerYear>(
      ApiService.buildUrl('api', `waitlist-admin-shooting_statistics_get.php?${urlParam.toString()}`), {
        headers: ApiService.buildHeaders(user, pwd),
      },
    );
  }

  public getShootingStatisticsPerMonth(adminData: AdminUserData, showMinors: boolean, showGroups: boolean): Observable<ShootingStatisticsResponsePerMonth> {
    const urlParam = ShootingStatisticApiService.buildParams(showMinors, showGroups);
    return this.http.get<ShootingStatisticsResponsePerMonth>(
      ApiService.buildUrl('api', `waitlist-admin-shooting_statistics_month_get.php?${urlParam.toString()}`),
      {headers: ApiService.buildHeaders(adminData.user, adminData.pwd)},
    );
  }
}
