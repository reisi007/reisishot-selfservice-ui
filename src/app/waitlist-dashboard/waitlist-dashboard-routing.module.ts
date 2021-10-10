import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WaitlistDashboardComponent} from './waitlist-dashboard.component';

const routes: Routes = [{path: '', component: WaitlistDashboardComponent, data: {title: 'Dashboard für die Warteliste'}}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WaitlistDashboardRoutingModule {
}
