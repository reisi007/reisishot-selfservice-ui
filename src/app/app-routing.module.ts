import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateContractComponent} from './contract/create/create-contract/create-contract.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/contracts'},
  {path: 'contracts', component: CreateContractComponent, data: {title: 'Neuen Vertrag erstellen'}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
