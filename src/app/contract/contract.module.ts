import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContractRoutingModule} from './contract-routing.module';
import {ResendContractComponent} from './resend-contract/resend-contract.component';
import {DisplayContractComponent} from './display-contract/display-contract.component';
import {ResendContractAccessKeyComponent} from './resend-contract-access-key/resend-contract-access-key.component';
import {PreviewContractComponent} from './preview-contract/preview-contract.component';
import {MarkdownModule} from '../markdown/markdown.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [ResendContractComponent, DisplayContractComponent, ResendContractAccessKeyComponent, PreviewContractComponent],
  imports: [CommonModule, ContractRoutingModule, MarkdownModule, ReactiveFormsModule],
})
export class ContractModule {
}
