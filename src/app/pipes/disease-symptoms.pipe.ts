import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'diseaseSymptomsPipe'
})
export class DiseaseSymptomsPipe implements PipeTransform {

  transform(value : any) : string{
    var retVal : string = "";
    var i : number = 0;
    for(let diseaseSymptom of value){
        retVal += diseaseSymptom.symptom.name;
        i++;
        if(i<value.length){
            retVal+=", ";
        }        
    }

    return retVal;
  }

}
