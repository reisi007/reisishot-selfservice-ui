import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StatisticsDashboardComponent} from './statistics-dashboard.component';

const routes: Routes = [{path: '', component: StatisticsDashboardComponent, data: {title: 'Statistik'}}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatisticsDashboardRoutingModule {
}
