import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filterString: string, propName:string): any[] {
    console.log(filterString);
    console.log(value[0][propName]);
    const resultArray =[];
    if(value.length===0 || filterString ==='' || propName===''){
      return value;
    }
    for(const item of value){
      console.log(item[propName]);
      if(item[propName] === filterString){
        resultArray.push(item);
      }
    }
    return resultArray;
  }

}
