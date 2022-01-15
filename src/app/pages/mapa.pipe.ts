import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapa'
})
export class MapaPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
