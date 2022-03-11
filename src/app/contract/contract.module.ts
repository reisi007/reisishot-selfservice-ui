import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContractRoutingModule} from './contract-routing.module';
import {DisplayContractComponent} from './display-contract/display-contract.component';
import {PreviewContractComponent} from './preview-contract/preview-contract.component';
import {MarkdownModule} from '../markdown/markdown.module';
import {ReactiveFormsModule} from '@angular/forms';
import {LoadingIndicatorComponent} from './display-contract/loading-indicator/loading-indicator.component';

@NgModule({
  declarations: [DisplayContractComponent, PreviewContractComponent, LoadingIndicatorComponent],
  imports: [CommonModule, ContractRoutingModule, MarkdownModule, ReactiveFormsModule],
})
export class ContractModule {
}
