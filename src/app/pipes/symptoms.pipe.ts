import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'symptomsPipe'
})
export class SymptomsPipe implements PipeTransform {

  transform(value : any) : string{
    var retVal : string = "";
    var i : number = 0;
    for(let symptom of value){
        retVal += symptom.name;
        i++;
        if(i<value.length){
            retVal+=", ";
        }        
    }

    return retVal;
  }

}
