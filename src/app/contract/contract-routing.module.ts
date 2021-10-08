import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ResendContractComponent} from './resend-contract/resend-contract.component';
import {DisplayContractComponent} from './display-contract/display-contract.component';
import {PreviewContractComponent} from './preview-contract/preview-contract.component';

const routes: Routes = [
  {path: '', component: ResendContractComponent, data: {title: 'Infos zu Verträgen neu senden'}},
  {path: ':mail/:access_key', component: DisplayContractComponent, data: {title: 'Vertrag anzeigen & unterschreiben'}},
  {path: ':filename', component: PreviewContractComponent, data: {title: 'Vorschau des Vertrages'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractRoutingModule {
}
