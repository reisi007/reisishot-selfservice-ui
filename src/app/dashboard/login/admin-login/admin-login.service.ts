import {Injectable} from '@angular/core';
import {ApiService} from '../../../commons/ApiService';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AdminUserData} from './AdminUserData';

@Injectable({
  providedIn: 'root',
})
export class AdminLoginService extends ApiService {
  constructor(private http: HttpClient) {
    super();
  }

  public login(userdata: AdminUserData): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      ApiService.buildUrl('api', 'admin_login_post.php'),
      undefined,
      {headers: ApiService.buildHeaders(userdata.user, userdata.pwd)},
    );
  }
}

export type LoginResponse = {
  user: string,
  hash: string
}
