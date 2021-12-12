import {Injectable} from '@angular/core';
import {ApiService} from '../../commons/ApiService';
import {Observable} from 'rxjs';
import {AdminWaitlistRecord, LeaderboardEntry, WaitlistAdminData} from './waitlist-admin-api';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {WaitlistPerson} from '../../waitlist/api/waitlist-api';

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
                         // noinspection SuspiciousTypeOfGuard
                         if (typeof registration.person_id === 'string') {
                           registration.person_id = parseInt(registration.person_id, 10);
                         }
                         // noinspection SuspiciousTypeOfGuard
                         if (typeof registration.item_id === 'string') {
                           registration.item_id = parseInt(registration.item_id, 10);
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

  public ignoreWaitlistItem(user: string, pwd: string, record: AdminWaitlistRecord): Observable<any> {
    return this.http.post(ApiService.buildUrl('api', 'waitlist-admin-ignore_post.php'),
      {item: record.item_id, person: record.person_id}, {
        headers: ApiService.buildHeaders(user, pwd),
      });
  }

  public removeWaitlistItem(user: string, pwd: string, record: AdminWaitlistRecord): Observable<any> {
    return this.http.post(ApiService.buildUrl('api', 'waitlist-admin-delete_post.php'),
      {item: record.item_id, person: record.person_id}, {
        headers: ApiService.buildHeaders(user, pwd),
      });
  }

  public loadRegisteredPersons(user: string, pwd: string): Observable<Array<WaitlistPerson>> {
    //TODO fix data when needed
    return this.http.get<Array<WaitlistPerson>>(
      ApiService.buildUrl('api', 'waitlist-admin_persons_get.php'),
      {headers: ApiService.buildHeaders(user, pwd)},
    );
  }

  public loadLeaderboardByYear(user: string, pwd: string, year: number): Observable<Array<LeaderboardEntry>> {
    return this.http.post<Array<LeaderboardEntry>>(
      ApiService.buildUrl('api', 'waitlist-admin-leaderboard_by_year_post.php'),
      {year},
      {headers: ApiService.buildHeaders(user, pwd)},
    );
  }
}
