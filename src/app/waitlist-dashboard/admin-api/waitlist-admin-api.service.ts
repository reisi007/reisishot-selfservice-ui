import {Injectable} from '@angular/core';
import {ApiService} from '../../commons/ApiService';
import {Observable} from 'rxjs';
import {WaitlistAdminData} from './waitlist-admin-api';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WaitlistAdminApiService extends ApiService {
  constructor(private http: HttpClient) {
    super();
  }

  public loadData(user: string, pwd: string): Observable<WaitlistAdminData> {
    return this.http
               .get<WaitlistAdminData>(
                 ApiService.buildUrl('api', 'waitlist-admin_get.php'),
                 {headers: ApiService.buildHeaders(user, pwd)},
               )
               .pipe(
                 map(wad => {
                   wad.registrations.forEach(i => {
                     i.registrations.forEach(registration => {
                         // noinspection SuspiciousTypeOfGuard
                         if (typeof registration.points === 'string') {
                           registration.points = parseInt(registration.points, 10);
                         }
                       },
                     );
                   });

                   wad.leaderboard.forEach(e => {
                     // noinspection SuspiciousTypeOfGuard
                     if (typeof e.points === 'string') {
                       e.points = parseInt(e.points, 10);
                     }
                   });
                   return wad;
                 }),
               );
  }

  public ignoreWaitlistItem(user: string, pwd: string, id: number): Observable<any> {
    return this.http.post(ApiService.buildUrl('api', 'waitlist-admin-ignore_post.php?id=' + id), null, {
      headers: ApiService.buildHeaders(user, pwd),
    });
  }

  public removeWaitlistItem(user: string, pwd: string, id: number): Observable<any> {
    return this.http.post(ApiService.buildUrl('api', 'waitlist-admin-delete_post.php?id=' + id), null, {
      headers: ApiService.buildHeaders(user, pwd),
    });
  }
}
