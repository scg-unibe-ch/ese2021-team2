import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: true
})

export class filterPipe implements PipeTransform {
transform(items: any[], filter: string): any {
    if (!items || !filter) {
        return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    if(filter.includes("Semester")){
      return items.filter(item => item.semester && item.semester.indexOf(filter) !== -1);
    }
    return items.filter(item => item.category && item.category.indexOf(filter) !== -1);
}
}

