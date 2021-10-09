import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WaitlistComponent} from './waitlist/waitlist.component';
import {SecureWaitlistAreaComponent} from './secure-waitlist-area/secure-waitlist-area.component';

const routes: Routes = [
  {path: '', component: WaitlistComponent, data: {title: 'Warteliste für Shootings'}},
  {path: ':email/:access_key', component: SecureWaitlistAreaComponent, data: {title: 'Warteliste für Shootings'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WaitlistRoutingModule {
}
