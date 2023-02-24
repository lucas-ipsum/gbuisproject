import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUser'
})
export class FilterUserPipe implements PipeTransform {

  transform(allUser: any, rolle: string) {
    if(!allUser || !rolle) {
      return []
    }
    else if (rolle === 'All') {
      return allUser
    }
    else {
      return allUser.filter(user => user.rolle === rolle)
    }
  }

}
