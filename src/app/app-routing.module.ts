import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateContractComponent} from './contract/create-contract/create-contract.component';
import {DisplayContractComponent} from './contract/display-contract/display-contract.component';
import {PreviewContractComponent} from './contract/preview-contract/preview-contract.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/contracts'},
  {path: 'contracts', component: CreateContractComponent, data: {title: 'Neuen Vertrag erstellen'}},
  {path: 'contracts/:mail/:access_key', component: DisplayContractComponent, data: {title: 'Vertrag anzeigen & unterschreiben'}},
  {path: 'contracts/:filename', component: PreviewContractComponent, data: {title: 'Vorschau des Vertrages'}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
