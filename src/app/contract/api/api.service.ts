import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  public getContracts(): Observable<Array<string>> {
    return this.http
               .get<Array<string>>(
                 this.buildUrl('api', 'availableContracts.php'),
               );
  }

  private buildUrl(...paths: string[]) {
    return environment.baseUrl + '/' + paths.join('/');
  }
}
