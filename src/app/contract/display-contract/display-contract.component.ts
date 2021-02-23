import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../api/api.service';
import {GetContractResponse} from '../api/getContractResponse';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-display-contract',
  templateUrl: './display-contract.component.html',
  styleUrls: ['./display-contract.component.scss'],
})
export class DisplayContractComponent implements OnInit {

  email: string;
  accessKey: string;

  contractData: GetContractResponse = undefined;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
  ) {
    this.route.params.subscribe(params => {
      this.email = params.mail;
      this.accessKey = params.access_key;
      this.apiService.getContract(this.email, this.accessKey).subscribe(params => {
        this.contractData = params;
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
    console.log('Sign requested');
  }
}
