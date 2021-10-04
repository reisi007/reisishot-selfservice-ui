import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContractRoutingModule} from './contract-routing.module';
import {CreateContractComponent} from './create-contract/create-contract.component';
import {PersonComponent} from './create-contract/person/person.component';
import {DisplayContractComponent} from './display-contract/display-contract.component';
import {ResendContractAccessKeyComponent} from './resend-contract-access-key/resend-contract-access-key.component';
import {PreviewContractComponent} from './preview-contract/preview-contract.component';
import {MarkdownModule} from '../markdown/markdown.module';
import {ReactiveFormsModule} from '@angular/forms';
import {PrettyFilenamePipe} from './create-contract/pretty-filename/pretty-filename.pipe';


@NgModule({
  declarations: [
    CreateContractComponent,
    PersonComponent,
    DisplayContractComponent,
    ResendContractAccessKeyComponent,
    PreviewContractComponent,
    PrettyFilenamePipe,
  ],
  imports: [
    CommonModule,
    ContractRoutingModule,
    MarkdownModule,
    ReactiveFormsModule,
  ],
})
export class ContractModule {
}
