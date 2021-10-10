import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ContractApiService} from '../api/contract-api.service';

@Component({
  selector: 'app-preview-contract',
  templateUrl: './preview-contract.component.html',
  styleUrls: ['./preview-contract.component.scss'],
})
export class PreviewContractComponent implements OnInit {
  contract: string | undefined;
  loaded = true;

  constructor(private route: ActivatedRoute, private apiService: ContractApiService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(routeData => {
      const filename = routeData.filename;

      this.apiService.getContractTemplate(filename).subscribe(
        param => {
          this.loaded = true;
          this.contract = param;
        },
        () => (this.loaded = false),
      );
    });
  }
}
