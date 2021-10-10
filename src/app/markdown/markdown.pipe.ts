import {Pipe, PipeTransform} from '@angular/core';
import md from 'markdown-it';

@Pipe({
  name: 'markdown',
})
export class MarkdownPipe implements PipeTransform {
  private static markdownRenderer = md();

  transform(value: string, ...args: unknown[]): unknown {
    return MarkdownPipe.markdownRenderer.render(value);
  }
}
