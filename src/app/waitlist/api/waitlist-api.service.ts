import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../../commons/ApiService';
import {Observable} from 'rxjs';
import {WaitlistItem} from '../waitlist/waitlistData';

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
                 ApiService.buildSecuredUrl(email, secret, 'api', 'waitlist-overview_get.php'),
               );
  }

}
