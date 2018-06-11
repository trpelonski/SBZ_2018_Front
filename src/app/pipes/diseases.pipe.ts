import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'diseasesPipe'
})
export class DiseasesPipe implements PipeTransform {

  transform(value : any) : string{
    var retVal : string = "";
    var i : number = 0;
    for(let disease of value){
        retVal += disease.name;
        i++;
        if(i<value.length){
            retVal+=", ";
        }        
    }

    return retVal;
}

}
