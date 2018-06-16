import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'substancesPipe'
})
export class SubstancesPipe implements PipeTransform {

  transform(value : any) : string{
    var retVal : string = "";
    var i : number = 0;
    for(let substance of value){
        retVal += substance.name;
        i++;
        if(i<value.length){
            retVal+=", ";
        }        
    }

    return retVal;
  }

}
