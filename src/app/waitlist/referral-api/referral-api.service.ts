import {Injectable} from '@angular/core';
import {ApiService} from '../../commons/ApiService';
import {HttpClient} from '@angular/common/http';
import {Perk, ReferralInfo, ReferralPointEntry} from './referral-api.model';
import {Observable} from 'rxjs';
import {Userdata} from '../api/waitlist-api';

@Injectable({
  providedIn: 'root',
})
export class ReferralApiService extends ApiService {
  constructor(private http: HttpClient) {
    super();
  }

  public addPoints(referralInfo: ReferralInfo, auth: { user: string; pwd: string }): Observable<any> {
    return this.access(referralInfo, auth, 'referral-points_post.php');
  }

  public addPointsDirect(referralInfo: ReferralInfo, auth: { user: string; pwd: string }): Observable<any> {
    return this.access(referralInfo, auth, 'referral-points-direct_post.php');
  }

  public loadPerks(): Observable<Array<Perk>> {
    return this.http
               .get<Array<Perk>>(
                 ApiService.buildUrl('api', 'referral-perks_get.php'),
               );
  }

  public loadPointHistory(auth: Userdata): Observable<Array<ReferralPointEntry>> {
    return this.http
               .get<Array<ReferralPointEntry>>(
                 ApiService.buildUrl('api', 'referral-points-history_get.php'),
                 {headers: ApiService.buildHeaders(auth.email, auth.access_key)},
               );
  }

  private access(referralInfo: ReferralInfo, auth: { user: string; pwd: string }, path: string): Observable<any> {
    return this.http
               .post(
                 ApiService.buildUrl('api', path),
                 referralInfo,
                 {headers: ApiService.buildHeaders(auth.user, auth.pwd)},
               );
  }

}
