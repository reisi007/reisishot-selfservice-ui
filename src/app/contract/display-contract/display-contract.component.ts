import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ContractApiService} from '../api/contract-api.service';
import {ContractData} from '../api/contractData';
import * as dayjs from 'dayjs';
import {SignStatus} from '../api/signStatus';
import {Observable, timer} from 'rxjs';
import {LogEntry, LogType} from '../api/logEntry';
import {formatDate, formatDateTime} from '../../commons/datetime.formatter';

@Component({
  selector: 'app-display-contract',
  templateUrl: './display-contract.component.html',
  styleUrls: ['./display-contract.component.scss'],
})
export class DisplayContractComponent implements OnInit {
  static readonly UPDATE_INTERVAL = 5 * 60 * 1000; // 5 minutes

  email!: string;
  accessKey!: string;

  contractData!: ContractData;

  signStatus: Observable<Array<SignStatus>> | undefined;

  contractIsValid: boolean | undefined;

  logs: Observable<Array<LogEntry>> | undefined;

  curUserSigned = true;

  constructor(private route: ActivatedRoute, private apiService: ContractApiService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(routeData => {
      this.email = routeData.mail;
      this.accessKey = routeData.access_key;
      this.fetchContract().subscribe(contractData => {
        this.contractData = contractData;

        timer(500).subscribe(() => {
          this.apiService.postLogEntry(this.email, this.accessKey, LogType.OPEN).subscribe(() => {
            timer(0, DisplayContractComponent.UPDATE_INTERVAL).subscribe(() => {
              this.fetchSignStatus();
              this.fetchLogs();
              this.fetchContractStatus();
            });
          });
        });
      });
    });
  }

  sign(): void {
    this.apiService.postLogEntry(this.email, this.accessKey, LogType.SIGN).subscribe(() => {
      this.fetchSignStatus();
      this.fetchLogs();
    });
  }

  calculateAge(val: string): string {
    return dayjs(this.contractData?.due_date).diff(dayjs(val), 'year', true).toFixed(2);
  }

  formatDateTime(dateTimeString: string): string {
    return formatDateTime(dateTimeString);
  }

  formatDate(dateString: string): string {
    return formatDate(dateString);
  }

  private fetchContract(): Observable<ContractData> {
    return this.apiService.getContractData(this.email, this.accessKey);
  }

  private fetchSignStatus() {
    this.signStatus = this.apiService.getSignStatus(this.email, this.accessKey);
    this.signStatus.subscribe(data => {
      this.curUserSigned = data.map(e => e.email === this.contractData?.email && e.signed === '1').reduce((a, b) => a || b);
    });
  }

  private fetchLogs() {
    this.logs = this.apiService.getLogEntries(this.email, this.accessKey);
  }

  private fetchContractStatus() {
    this.apiService.checkContractValidity(this.email, this.accessKey).subscribe(data => {
      this.contractIsValid = data.result.toLowerCase() === '1';
    });
  }
}
