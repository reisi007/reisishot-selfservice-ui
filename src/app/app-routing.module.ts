import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateContractComponent} from './contract/create-contract/create-contract.component';
import {DisplayContractComponent} from './contract/display-contract/display-contract.component';
import {PreviewContractComponent} from './contract/preview-contract/preview-contract.component';
import {WaitlistComponent} from './waitlist/waitlist/waitlist.component';
import {WaitlistAdminComponent} from './waitlist/waitlist-admin/waitlist-admin.component';
import {OverviewComponent} from './overview/overview.component';
import {ReviewComponent} from './review/review.component';


const routes: Routes = [
  {path: '', component: OverviewComponent, data: {title: 'Verfügbare Services'}},
  {path: 'contracts', component: CreateContractComponent, data: {title: 'Neuen Vertrag erstellen'}},
  {path: 'contracts/:mail/:access_key', component: DisplayContractComponent, data: {title: 'Vertrag anzeigen & unterschreiben'}},
  {path: 'contracts/:filename', component: PreviewContractComponent, data: {title: 'Vorschau des Vertrages'}},
  {path: 'waitlist', component: WaitlistComponent, data: {title: 'Warteliste für Shootings'}},
  {path: 'waitlist/dashboard', component: WaitlistAdminComponent, data: {title: 'Dashboard für die Warteliste'}},
  {path: 'review/:mail/:access_key', component: ReviewComponent, data: {title: 'Bewertung abgeben oder bearbeiten'}},
  {path: '**', redirectTo: '/', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
