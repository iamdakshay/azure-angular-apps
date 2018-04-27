import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderby' ,
  pure:false
})
export class OrderbyPipe implements PipeTransform {

  transform(list: Array<any>, orderbyAttribute, asc = true): Array<any> {

    if (!orderbyAttribute || orderbyAttribute.trim() == ""){
      return list;
    } 

    if (asc){

      return list.sort((item1: any, item2: any) => { 
        if(item1[orderbyAttribute]<item2[orderbyAttribute]){
          return -1;          
        }
        else if(item2[orderbyAttribute]<item1[orderbyAttribute]){
          return 1;
        }
        else{
          return 0;
        }
      });
    }
    else{

      return Array.from(list).sort((item1: any, item2: any) => { 
        if(item1[orderbyAttribute]>item2[orderbyAttribute]){
          return -1;          
        }
        else if(item2[orderbyAttribute]>item1[orderbyAttribute]){
          return 1;
        }
        else{
          return 0;
        }
      });
    }
  }

}
