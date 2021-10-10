import {Component, OnInit} from '@angular/core';
import {ContractApiService} from '../../contract/api/contract-api.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-preview-contract-chooser',
  templateUrl: './preview-contract-chooser.component.html',
  styleUrls: ['./preview-contract-chooser.component.scss'],
})
export class PreviewContractChooserComponent implements OnInit {
  contracts!: Observable<Array<{ name: string; value: string }>>;

  constructor(private apiService: ContractApiService) {
  }

  ngOnInit(): void {
    this.contracts = this.apiService.getContracts().pipe(
      map(data =>
        data.map(e => {
          const filename = e.substring(0, e.indexOf('.'));
          return {name: filename.charAt(0).toUpperCase() + filename.slice(1), value: e};
        }),
      ),
    );
  }
}
