import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CreateContract, Person} from './createContract';
import {ContractData} from './contractData';
import {SignStatus} from './signStatus';
import {LogEntry, LogType} from './logEntry';
import {IsValidResponse} from './IsValidResponse';
import {ApiService} from '../../commons/ApiService';
import {NgHttpCachingHeaders} from 'ng-http-caching';
import {AdminUserData} from '../../dashboard/login/admin-login/AdminUserData';

@Injectable({
  providedIn: 'root',
})
export class ContractApiService extends ApiService {
  constructor(private http: HttpClient) {
    super();
  }

  public getContracts(): Observable<Array<string>> {
    return this.http.get<Array<string>>(ApiService.buildUrl('api', 'contract-templates_get.php'));
  }

  public createContract(data: CreateContract, {user, pwd}: AdminUserData): Observable<any> {
    return this.http.put(ApiService.buildUrl('api', 'contract_put.php'), data, {headers: ApiService.buildHeaders(user, pwd)});
  }

  public getContractData(email: string, accessKey: string): Observable<ContractData> {
    return this.http.get<ContractData>(ApiService.buildUrl('api', 'contract_get.php'), {
      headers: ApiService.buildHeaders(email, accessKey),
    });
  }

  public getSignStatus(email: string, accessKey: string, cache: boolean): Observable<Array<SignStatus>> {
    return this.http.get<Array<SignStatus>>(ApiService.buildUrl('api', 'contract-signed_status_get.php'), {
      headers: {
        ...ApiService.buildHeaders(email, accessKey),
        [NgHttpCachingHeaders.DISALLOW_CACHE]: cache ? '0' : '1',
      },

    });
  }

  public getLogEntries(email: string, accessKey: string): Observable<Array<LogEntry>> {
    return this.http.get<Array<LogEntry>>(ApiService.buildUrl('api', 'contract-log_get.php'), {
      headers: ApiService.buildHeaders(email, accessKey),
    });
  }

  public postLogEntry(email: string, accessKey: string, logType: LogType) {
    return this.http.put(
      ApiService.buildUrl('api', 'contract-log_put.php'),
      {action: logType.toString(), baseUrl: window.location.origin},
      {headers: ApiService.buildHeaders(email, accessKey)},
    );
  }

  public getContractTemplate(template: string): Observable<string> {
    return this.http.get(ApiService.buildUrl('api', 'contract-template_get.php?filename=' + template), {responseType: 'text'});
  }

  public checkContractValidity(email: string, accessKey: string): Observable<IsValidResponse> {
    return this.http.get<IsValidResponse>(ApiService.buildUrl('api', 'contract-valid_get.php'), {
      headers: ApiService.buildHeaders(email, accessKey),
    });
  }

  public loadPersons(user: string, pwd: string): Observable<Array<Person>> {
    return this.http.get<Array<Person>>(
      ApiService.buildUrl('api', 'contract-people_get.php'),
      {headers: ApiService.buildHeaders(user, pwd)},
    );
  }
}
