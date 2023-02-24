import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBuis'
})
export class SortBuisPipe implements PipeTransform {

  transform(list: any[], field: string | number, ascending: boolean) {
    if (ascending) {
      list.sort((a: any, b: any) => {
        if ((typeof (a[field]) === 'string') && (typeof (b[field]) === 'string')) {
          return (a[field].toLowerCase() > b[field].toLowerCase()) ? 1 : ((b[field].toLowerCase() > a[field].toLowerCase()) ? -1 : 0);
        }
        else if ((typeof (a[field] === 'number')) && (typeof (b[field] === 'number'))) {
          return (a[field] > b[field]) ? 1 : ((b[field] > a[field]) ? -1 : 0);
        }
      });
    } else {
      list.sort((a: any, b: any) => {
        if ((typeof (a[field]) === 'string') && (typeof (b[field]) === 'string')) {
          return (b[field].toLowerCase() > a[field].toLowerCase()) ? 1 : ((a[field].toLowerCase() > b[field].toLowerCase()) ? -1 : 0);
        }
        else if ((typeof (a[field] === 'number')) && (typeof (b[field] === 'number'))) {
          return (b[field] > a[field]) ? 1 : ((a[field] > b[field]) ? -1 : 0);
        }
      });
    }
  }


}
