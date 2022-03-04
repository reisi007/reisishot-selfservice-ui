import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContractDashboardComponent} from './contract-dashboard.component';

const routes: Routes = [{path: '', component: ContractDashboardComponent, data: {title: 'Verträge'}}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractDashboardRoutingModule {
}
