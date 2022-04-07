import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ContractApiService} from '../api/contract-api.service';
import {ContractData} from '../api/contractData';
import {SignStatus} from '../api/signStatus';
import {Observable, timer} from 'rxjs';
import {LogEntry, LogType} from '../api/logEntry';
import {calculateAge, formatDate, formatDateTime} from '../../commons/datetime.formatter';

@Component({
  selector: 'app-display-contract',
  templateUrl: './display-contract.component.html',
  styleUrls: ['./display-contract.component.scss'],
})
export class DisplayContractComponent implements OnInit {
  static readonly UPDATE_INTERVAL = 5 * 60 * 1000; // 5 minutes

  email!: string;
  accessKey!: string;
  signStatus?: Observable<Array<SignStatus>>;
  contractIsValid?: boolean;
  logs?: Observable<Array<LogEntry>>;
  curUserSigned = true;

  constructor(
    private route: ActivatedRoute,
    private apiService: ContractApiService,
  ) {
  }

  _contractData: ContractData | 'NOT LOADED' | 'NOT FOUND' = 'NOT LOADED';

  get contractData(): ContractData | null {
    if (typeof this._contractData === 'string') {
      return null;
    }
    return this._contractData;

  }

  ngOnInit(): void {
    this.route.params.subscribe(routeData => {
      this.email = routeData['mail'];
      this.accessKey = routeData['access_key'];
      this.fetchContract().subscribe({
        next: (contractData) => {
          this._contractData = contractData;

          timer(500).subscribe(() => {
            this.apiService.postLogEntry(this.email, this.accessKey, LogType.OPEN).subscribe(() => {
              timer(0, DisplayContractComponent.UPDATE_INTERVAL).subscribe(() => {
                this.fetchSignStatus();
                this.fetchLogs();
                this.fetchContractStatus();
              });
            });
          });
        },
        error: () => {
          this._contractData = 'NOT FOUND';
        },
      });
    });
  }

  sign(): void {
    this.apiService.postLogEntry(this.email, this.accessKey, LogType.SIGN).subscribe(() => {
      this.fetchSignStatus(false);
      this.fetchLogs();
    });
  }

  calculateAge(val: string): string {
    return calculateAge(val, this.contractData?.due_date);
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

  private fetchSignStatus(cache: boolean = true) {
    this.signStatus = this.apiService.getSignStatus(this.email, this.accessKey, cache);
    this.signStatus.subscribe(data => {
      this.curUserSigned = data.map(e => {
        const contractData = this.contractData;
        if (contractData === null) {
          return false;
        }
        return e.email === contractData.email && e.signed === '1';
      }).reduce((a, b) => a || b);
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
