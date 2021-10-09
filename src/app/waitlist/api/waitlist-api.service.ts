import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../../commons/ApiService';
import {Observable} from 'rxjs';
import {Userdata, WaitlistItem, WaitlistPerson, WaitlistRecord} from './waitlist-api';


@Injectable({
  providedIn: 'root',
})
export class WaitlistApiService extends ApiService {

  constructor(private http: HttpClient) {
    super();
  }

  public getPublicItems(): Observable<Array<WaitlistItem>> {
    return this.http
               .get<Array<WaitlistItem>>(
                 ApiService.buildUrl('api', 'waitlist-overview-public_get.php'),
               );
  }

  public getPrivateItems(user: Userdata): Observable<Array<WaitlistItem>> {
    return this.http
               .get<Array<WaitlistItem>>(
                 ApiService.buildUrl('api', 'waitlist-overview_get.php'),
                 {
                   headers: ApiService.buildHeaders(user.email, user.access_key),
                 },
               );
  }

  public register(waitlistPerson: WaitlistPerson): Observable<any> {
    return this.http
               .post(
                 ApiService.buildUrl('api', 'waitlist-register_post.php'),
                 waitlistPerson,
               );
  }

  public login(email: string): Observable<any> {
    return this.http
               .post(
                 ApiService.buildUrl('api', 'waitlist-login_post.php'),
                 {email},
               );
  }

  public registerForShooting(user: Userdata, registrationData: WaitlistRecord) {
    return this.http
               .put(
                 ApiService.buildUrl('api', 'waitlist-entry_put.php'),
                 registrationData,
                 {
                   headers: ApiService.buildHeaders(user.email, user.access_key),
                 },
               );
  }

  public deleteRegistration(user: Userdata, itemId: number) {
    return this.http
               .post(
                 ApiService.buildUrl('api', 'waitlist-entry-remove_post.php'),
                 {item_id: itemId},
                 {
                   headers: ApiService.buildHeaders(user.email, user.access_key),
                 },
               );
  }

}
