import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'prettyFilename',
})
export class PrettyFilenamePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    return value
      .substring(0, value.lastIndexOf('.'))
      .replace(/[-#_]/, ' ')
      .split(' ')
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');
  }
}
