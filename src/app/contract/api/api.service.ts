import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CreateContract} from './createContract';
import {ContractData} from './contractData';
import {SignStatus} from './signStatus';
import {LogEntry, LogType} from './logEntry';


@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  private static buildUrl(...paths: string[]): string {
    return environment.baseUrl + '/' + paths.join('/');
  }

  private static buildSecuredUrl(email: string, accessKey: string, ...paths: string[]): string {
    return ApiService.buildUrl(...paths) + '?email=' + email + '&access_key=' + accessKey;
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

  public getContractData(email: string, accessKey: string): Observable<ContractData> {
    return this.http
               .get<ContractData>(
                 ApiService.buildSecuredUrl(email, accessKey, 'api', 'contract_get.php'),
               );
  }

  public getSignStatus(email: string, accessKey: string): Observable<Array<SignStatus>> {
    return this.http
               .get<Array<SignStatus>>(
                 ApiService.buildSecuredUrl(email, accessKey, 'api', 'signed_status_get.php'),
               );
  }

  public getLogEntries(email: string, accessKey: string): Observable<Array<LogEntry>> {
    return this.http
               .get<Array<LogEntry>>(
                 ApiService.buildSecuredUrl(email, accessKey, 'api', 'log_get.php'),
               );
  }

  public postLogEntry(email: string, accessKey: string, logType: LogType) {
    return this.http
               .put(
                 ApiService.buildSecuredUrl(email, accessKey, 'api', 'log_put.php'),
                 {action: logType.toString(), baseUrl: window.location.origin},
               );
  }

  public getContractTemplate(template: string): Observable<string> {
    return this.http
               .get(
                 ApiService.buildUrl('api', 'contract-template_get.php?filename=' + template),
                 {responseType: 'text'},
               );
  }
}
