import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../../../commons/ApiService';
import {Observable} from 'rxjs';
import {ShootingStatisticsResponse} from '../../review-dashboard/api/Model';
import {AdminUserData} from '../../../dashboard/login/admin-login/AdminUserData';

@Injectable()
export class ShootingStatisticApiService extends ApiService {

  constructor(private http: HttpClient) {
    super();
  }

  public getShootingStatistics(adminData: AdminUserData, showMinors: boolean, showGroups: boolean): Observable<ShootingStatisticsResponse> {
    const urlParam = new URLSearchParams();
    if (!showMinors) {
      urlParam.set('showMinors', 'false');
    }
    if (!showGroups) {
      urlParam.set('showGroups', 'false');
    }

    const {user, pwd} = adminData;
    return this.http.get<ShootingStatisticsResponse>(
      ApiService.buildUrl('api', 'shooting_statistics_get.php?' + urlParam.toString()), {
        headers: ApiService.buildHeaders(user, pwd),
      },
    );
  }
}
