import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any, sortarg: string): any {
    if (!value || !sortarg) {
      return value;
    }
    else if (sortarg === 'date'){
      const sortedValues = value.sort((a:any, b:any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      return sortedValues;
    }
    else if (sortarg === 'like') {
      return value.sort();
    }
    
  }

}
