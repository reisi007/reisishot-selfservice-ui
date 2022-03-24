import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContractDashboardRoutingModule} from './contract-dashboard-routing.module';
import {ContractDashboardComponent} from './contract-dashboard.component';
import {PrettyFilenamePipe} from './pretty-filename/pretty-filename.pipe';
import {PersonComponent} from './person/person.component';
import {MarkdownModule} from '../../markdown/markdown.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    ContractDashboardComponent,
    PrettyFilenamePipe,
    PersonComponent,
  ],
  imports: [
    CommonModule,
    ContractDashboardRoutingModule,
    ReactiveFormsModule,
    MarkdownModule,
  ],
})
export class ContractDashboardModule {
}
