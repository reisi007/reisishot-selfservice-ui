import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../api/api.service';
import {ContractData} from '../api/contractData';
import * as dayjs from 'dayjs';
import {SignStatus} from '../api/signStatus';
import {Observable, timer} from 'rxjs';
import {LogEntry, LogType} from '../api/logEntry';

@Component({
  selector: 'app-display-contract',
  templateUrl: './display-contract.component.html',
  styleUrls: ['./display-contract.component.scss'],
})
export class DisplayContractComponent implements OnInit {

  static readonly UPDATE_INTERVAL = 5 * 60 * 1000; // 5 minutes

  email: string;
  accessKey: string;

  contractData: ContractData = undefined;

  signStatus: Observable<Array<SignStatus>>;

  contractIsValid: boolean | null = null;

  logs: Observable<Array<LogEntry>>;

  curUserSigned = true;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
  ) {
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

  calculateAge(val: string): string {
    return dayjs(this.contractData.due_date)
      .diff(dayjs(val), 'year', true)
      .toFixed(2);
  }

  private fetchContract(): Observable<ContractData> {
    return this.apiService.getContractData(this.email, this.accessKey);
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

  private fetchContractStatus() {
    this.apiService.checkContractValidity(this.email, this.accessKey).subscribe(data => {
        this.contractIsValid = data.result.toLowerCase() === '1';
      },
    );
  }
}
