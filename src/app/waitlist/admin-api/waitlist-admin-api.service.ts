import {Injectable} from '@angular/core';
import {ApiService} from '../../commons/ApiService';
import {Observable} from 'rxjs';
import {WaitlistItemWithRegistrations} from './waitlist-admin-api';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WaitlistAdminApiService extends ApiService {

  constructor(private http: HttpClient) {
    super();
  }

  public getWaitlistItems(user: string, pwd: string): Observable<Array<WaitlistItemWithRegistrations>> {
    return this.http
               .get<Array<WaitlistItemWithRegistrations>>(
                 ApiService.buildUrl('api', 'waitlist-admin_get.php'),
                 {headers: ApiService.buildHeaders(user, pwd)},
               );
  }

  public ignoreWaitlistItem(user: string, pwd: string, id: number): Observable<any> {
    return this.http
               .post(
                 ApiService.buildUrl('api', 'waitlist-admin-ignore_post.php?id=' + id),
                 null,
                 {headers: ApiService.buildHeaders(user, pwd)},
               );
  }

  public removeWaitlistItem(user: string, pwd: string, id: number): Observable<any> {
    return this.http
               .post(
                 ApiService.buildUrl('api', 'waitlist-admin-delete_post.php?id=' + id),
                 null,
                 {headers: ApiService.buildHeaders(user, pwd)},
               );
  }
}
