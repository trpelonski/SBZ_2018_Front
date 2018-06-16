import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'diagnosticPipe'
})
export class DiagnosticPipe implements PipeTransform {

  transform(value : any) : string{
    var retVal : string = "";
    var i : number = 0;
    for(let diagnosticDisease of value){
        retVal += diagnosticDisease.disease.name
        if(diagnosticDisease.medications.length!=0){
          retVal +=" ( ";
          var j : number = 0;
          for(let medication of diagnosticDisease.medications){
            j++;
            retVal += medication.name;
          if(j<diagnosticDisease.medications.length){
              retVal+=", ";
            }        
          }
          retVal += " ) ";
        }
        i++;
        if(i<value.length){
            retVal+=", ";
        }        
    }

    return retVal;
  }

}
