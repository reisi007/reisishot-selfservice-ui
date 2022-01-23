import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DisplayContractComponent} from './display-contract/display-contract.component';
import {PreviewContractComponent} from './preview-contract/preview-contract.component';

const routes: Routes = [
  {path: ':mail/:access_key', component: DisplayContractComponent, data: {title: 'Vertrag anzeigen & unterschreiben'}},
  {path: ':filename', component: PreviewContractComponent, data: {title: 'Vorschau des Vertrages'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractRoutingModule {
}
