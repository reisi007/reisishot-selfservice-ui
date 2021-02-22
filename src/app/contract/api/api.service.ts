import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CreateContract} from './createContract';
import {GetContractResponse} from './getContractResponse';


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

  public createContract(data: CreateContract): Observable<any> {
    return this.http
               .put(
                 ApiService.buildUrl('api', 'contract_put.php'),
                 data,
               );
  }

  public getContract(email: string, accessKey: string): Observable<GetContractResponse> {
    return this.http
               .get<GetContractResponse>(
                 ApiService.buildUrl('api', 'contract_get.php?email=' + email + '&access_key=' + accessKey),
               );
  }
}
