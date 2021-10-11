import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RootRoutingModule} from './root-routing.module';
import {OverviewComponent} from './overview/overview.component';


@NgModule({
  declarations: [
    OverviewComponent,
  ],
  imports: [
    CommonModule,
    RootRoutingModule,
  ],
})
export class RootModule {
}
