import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe',
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(allBuis: any, filteredNames: string[]) {
    if (!allBuis || !filteredNames) {
      return allBuis = [];
    } else {
     return allBuis.filter(bui => filteredNames.includes(bui.name))
    }
  }
}
