import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MarkdownPipe} from './markdown.pipe';

@NgModule({
  declarations: [MarkdownPipe],
  imports: [CommonModule],
  exports: [MarkdownPipe],
})
export class MarkdownModule {
}
