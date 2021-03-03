import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../api/api.service';

@Component({
  selector: 'app-preview-contract',
  templateUrl: './preview-contract.component.html',
  styleUrls: ['./preview-contract.component.scss'],
})
export class PreviewContractComponent implements OnInit {

  contract: string;
  loaded = true;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(routeData => {
      const filename = routeData.filename;

      this.apiService.getContractTemplate(filename).subscribe(
        param => {
          this.loaded = true;
          this.contract = param;
        },
        () => this.loaded = false,
      );
    });
  }

}
