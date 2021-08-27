import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../../commons/ApiService';
import {Observable} from 'rxjs';
import {WaitlistItem, WaitlistRecord} from './waitlist-api';


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

  public getPrivateItems(email: string, secret: string): Observable<Array<WaitlistItem>> {
    return this.http
               .get<Array<WaitlistItem>>(
                 ApiService.buildUrl('api', 'waitlist-overview_get.php'),
                 {
                   headers: ApiService.buildHeaders(email, secret),
                 },
               );
  }

  public registerForWaitlist(registrationData: WaitlistRecord) {
    return this.http
               .put(
                 ApiService.buildUrl('api', 'waitlist-entry_put.php'),
                 registrationData,
                 {
                   headers: ApiService.buildHeaders(registrationData.email, registrationData.secret),
                 },
               );
  }

  public deleteRegistration(email: string, secret: string, itemId: number) {
    return this.http
               .post(
                 ApiService.buildUrl('api', 'waitlist-entry-remove_post.php'),
                 {item_id: itemId},
                 {
                   headers: ApiService.buildHeaders(email, secret),
                 },
               );
  }

}
