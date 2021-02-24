import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../api/api.service';
import {ContractData} from '../api/contractData';
import * as dayjs from 'dayjs';
import {SignStatus} from '../api/signStatus';
import {Observable} from 'rxjs';
import {LogEntry, LogType} from '../api/logEntry';

@Component({
  selector: 'app-display-contract',
  templateUrl: './display-contract.component.html',
  styleUrls: ['./display-contract.component.scss'],
})
export class DisplayContractComponent implements OnInit {

  email: string;
  accessKey: string;

  contractData: ContractData = undefined;

  signStatus: Observable<Array<SignStatus>>;

  logs: Observable<Array<LogEntry>>;

  curUserSigned = false;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
  ) {
    this.route.params.subscribe(routeData => {
      this.email = routeData.mail;
      this.accessKey = routeData.access_key;
      this.fetchContract().subscribe(contractData => {
        this.contractData = contractData;

        apiService.postLogEntry(this.email, this.accessKey, LogType.OPEN).subscribe(() => {
          this.fetchSignStatus();
          this.fetchLogs();
        });
      });
    });
  }

  ngOnInit(): void {
  }

  formatDueDate(dateString: string): string {
    return dayjs(dateString).format('DD.MM.YYYY HH:mm');
  }

  formatBirthday(dateString: string): string {
    return dayjs(dateString).format('DD.MM.YYYY');
  }

  sign(): void {
    this.apiService.postLogEntry(this.email, this.accessKey, LogType.SIGN).subscribe(() => {
      this.fetchSignStatus();
      this.fetchLogs();
    });
  }

  private fetchContract(): Observable<ContractData> {
    return this.apiService.getContract(this.email, this.accessKey);
  }

  private fetchSignStatus() {
    this.signStatus = this.apiService.getSignStatus(this.email, this.accessKey);
    this.signStatus.subscribe(data => {
      this.curUserSigned = data
        .map(e => e.email === this.contractData.email && e.signed === '1')
        .reduce((a, b) => a || b);
    });
  }


  private fetchLogs() {
    this.logs = this.apiService.getLogEntries(this.email, this.accessKey);
  }

}
