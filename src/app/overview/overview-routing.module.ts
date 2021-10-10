import {RouterModule, Routes} from '@angular/router';
import {OverviewComponent} from './landing/overview.component';
import {NgModule} from '@angular/core';

const routes: Routes = [{path: '', component: OverviewComponent, data: {title: 'Verfügbare Services'}}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OverviewRoutingModule {
}
