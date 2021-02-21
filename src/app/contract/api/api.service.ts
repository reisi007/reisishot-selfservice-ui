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

  private static buildUrl(...paths: string[]) {
    return environment.baseUrl + '/' + paths.join('/');
  }

  public getContracts(): Observable<Array<string>> {
    return this.http
               .get<Array<string>>(
                 ApiService.buildUrl('api', 'contract-templates_get.php'),
               );
  }
}
