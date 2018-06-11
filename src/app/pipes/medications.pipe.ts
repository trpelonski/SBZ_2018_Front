import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'medicationsPipe'
})
export class MedicationsPipe implements PipeTransform {

  transform(value : any) : string{
    var retVal : string = "";
    var i : number = 0;
    for(let medication of value){
        retVal += medication.name;
        i++;
        if(i<value.length){
            retVal+=", ";
        }        
    }

    return retVal;
  }
}
