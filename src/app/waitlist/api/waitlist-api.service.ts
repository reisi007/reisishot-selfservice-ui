import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../../commons/ApiService';
import {Observable} from 'rxjs';
import {UserContract, Userdata, WaitlistItem, WaitlistPerson, WaitlistRecord} from './waitlist-api';
import {map} from 'rxjs/operators';
import {Referrable} from '../referral-api/referral-api.model';

@Injectable({
  providedIn: 'root',
})
export class WaitlistApiService extends ApiService {
  constructor(private http: HttpClient) {
    super();
  }

  public loadPerson(user: Userdata): Observable<WaitlistPerson> {
    return this.http.get<WaitlistPerson>(ApiService.buildUrl('api', 'waitlist-person_get.php'), {
      headers: ApiService.buildHeaders(user.email, user.access_key),
    }).pipe(
      map(wp => {
        // noinspection SuspiciousTypeOfGuard
        if (typeof wp.points === 'string') {
          wp.points = parseInt(wp.points, 10);
        }
        return wp;
      }),
    );
  }

  public storePerson(user: Userdata, person: WaitlistPerson): Observable<any> {
    return this.http.post<any>(ApiService.buildUrl('api', 'waitlist-person_post.php'), person, {
      headers: ApiService.buildHeaders(user.email, user.access_key),
    });
  }

  public getPublicItems(): Observable<Array<WaitlistItem>> {
    return this.http.get<Array<WaitlistItem>>(ApiService.buildUrl('api', 'waitlist-overview-public_get.php'));
  }

  public getPrivateItems(user: Userdata): Observable<Array<WaitlistItem>> {
    return this.http.get<Array<WaitlistItem>>(ApiService.buildUrl('api', 'waitlist-overview_get.php'), {
      headers: ApiService.buildHeaders(user.email, user.access_key),
    });
  }

  public register(waitlistPerson: WaitlistPerson): Observable<any> {
    return this.http.post(ApiService.buildUrl('api', 'waitlist-register_post.php'), waitlistPerson);
  }

  public login(data: { email: string } & Referrable): Observable<any> {
    return this.http.post(ApiService.buildUrl('api', 'waitlist-login_post.php'), data);
  }

  public registerForShooting(user: Userdata, registrationData: WaitlistRecord) {
    return this.http.put(ApiService.buildUrl('api', 'waitlist-entry_put.php'), registrationData, {
      headers: ApiService.buildHeaders(user.email, user.access_key),
    });
  }

  public deleteRegistration(user: Userdata, itemId: number) {
    return this.http.post(
      ApiService.buildUrl('api', 'waitlist-entry-remove_post.php'),
      {item_id: itemId},
      {
        headers: ApiService.buildHeaders(user.email, user.access_key),
      },
    );
  }

  public loadUserContracts(user: Userdata): Observable<Array<UserContract>> {
    return this.http.get<Array<UserContract>>(
      ApiService.buildUrl('api', 'waitlistlist_contracts_get.php'),
      {headers: ApiService.buildHeaders(user.email, user.access_key)},
    );
  }
}
