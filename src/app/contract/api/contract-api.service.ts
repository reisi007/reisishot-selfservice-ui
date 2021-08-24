import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CreateContract} from './createContract';
import {ContractData} from './contractData';
import {SignStatus} from './signStatus';
import {LogEntry, LogType} from './logEntry';
import {IsValidResponse} from './IsValidResponse';
import {ApiService} from '../../commons/ApiService';


@Injectable({
  providedIn: 'root',
})
export class ContractApiService extends ApiService {

  constructor(private http: HttpClient) {
    super();
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
                 ApiService.buildSecuredUrl(email, accessKey, 'api', 'contract-signed_status_get.php'),
               );
  }

  public getLogEntries(email: string, accessKey: string): Observable<Array<LogEntry>> {
    return this.http
               .get<Array<LogEntry>>(
                 ApiService.buildSecuredUrl(email, accessKey, 'api', 'contract-log_get.php'),
               );
  }

  public postLogEntry(email: string, accessKey: string, logType: LogType) {
    return this.http
               .put(
                 ApiService.buildSecuredUrl(email, accessKey, 'api', 'contract-log_put.php'),
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

  public sendAllContractLinks(email: string) {
    return this.http
               .post(
                 ApiService.buildUrl('api', 'contracts-remind_post.php'),
                 {email, baseUrl: window.location.origin},
               );
  }

  public checkContractValidity(email: string, accessKey: string): Observable<IsValidResponse> {
    return this.http
               .get<IsValidResponse>(
                 ContractApiService.buildSecuredUrl(email, accessKey, 'api', 'contract-valid_get.php'),
               );
  }
}
