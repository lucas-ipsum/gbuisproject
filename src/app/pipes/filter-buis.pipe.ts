import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBuis'
})
export class FilterBuisPipe implements PipeTransform {

  transform(buis: any, inputValue: string) {
    if (!buis || !inputValue) {
      return buis = [];
    } else {
      return buis.filter(item => item.name.toLowerCase().startsWith(inputValue.toLowerCase()));
    }
  }
}
