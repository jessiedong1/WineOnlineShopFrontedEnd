import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: Array<string>, args: any[]): any {
    const sortField=args[0];
    const sortedDirection = args[1];
    let multipliter =1;
    if(sortedDirection==='desc'){
      multipliter=-1;
    }
    value.sort((a: any, b:any)=>{
      if(a[sortField]<b[sortField]){
        return -1*multipliter;
      }else if (a[sortField]>b[sortField]){
        return 1*multipliter;
      }
      else{
        return 0;
      }
    })
  }

}
