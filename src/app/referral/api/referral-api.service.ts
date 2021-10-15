import {Injectable} from '@angular/core';
import {ApiService} from '../../commons/ApiService';
import {HttpClient} from '@angular/common/http';
import {ReferralInfo} from './referral-api.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReferralApiService extends ApiService {
  constructor(private http: HttpClient) {
    super();
  }

  public addPoints(referralInfo: ReferralInfo, user: string, pwd: string): Observable<any> {
    return this.access(referralInfo, user, pwd, 'referral-points_post.php');
  }

  public addPointsDirect(referralInfo: ReferralInfo, user: string, pwd: string): Observable<any> {
    return this.access(referralInfo, user, pwd, 'referral-points-direct_post.php');
  }

  private access(referralInfo: ReferralInfo, user: string, pwd: string, path: string): Observable<any> {
    return this.http
               .post(
                 ApiService.buildUrl('api', path),
                 referralInfo,
                 {headers: ApiService.buildHeaders(user, pwd)},
               );
  }
}
