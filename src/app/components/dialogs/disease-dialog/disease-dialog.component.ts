import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, throwMatDialogContentAlreadyAttachedError } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { CrudService } from '../../../services/crud.service';

@Component({
  selector: 'app-disease-dialog',
  templateUrl: './disease-dialog.component.html',
  styleUrls: [ ]
})
export class DiseaseDialogComponent implements OnInit {

  private disease: any = {name : '', diseaseSymptoms: []};
  private symptoms: any[];

    constructor(public editDialog: MatDialog, public dialogRef: MatDialogRef<DiseaseDialogComponent>, 
        @Inject(MAT_DIALOG_DATA) public data: any, private crudService: CrudService) { }
    
      ngOnInit() {
        if(this.data.val != null){
          Object.assign(this.disease,this.data.val);
        }
    
        this.crudService.getAllSymptoms().subscribe((res: any) => {
          this.symptoms = res.body;
        });    
      }

      zatvori = function(){
        this.dialogRef.close(null);
      }

      potvrdi(){
       if(this.data.mode == 0){
          this.crudService.insertDisease(this.disease).subscribe((res: any) => {
            this.dialogRef.close(res.body);
          });
        }else{
          this.crudService.updateDisease(this.disease).subscribe((res: any) => {
            this.dialogRef.close(res.body);
          });
        }
      }

      bindSymptom(symptom:any){
        var index = this.containsElementSymptom(this.disease.diseaseSymptoms, symptom);
        if(index==-1){
          this.disease.diseaseSymptoms.push({symptom:symptom,disease:{},specificFor:false});
        }else{
          this.disease.diseaseSymptoms.splice(index,1);
        }
      }

      containsElementSymptom(diseaseSymptoms:any[],symptom:any){
        var index = 0;
        for(let diseaseSymptom of diseaseSymptoms){
          if(diseaseSymptom.symptom.id==symptom.id){
            return index;
          }
          index++;
        }
        return -1;
      }

      bindSpecific(symptom:any){
        for(let diseaseSymptom of this.disease.diseaseSymptoms){
          if(diseaseSymptom.symptom.id==symptom.id){
            if(diseaseSymptom.specificFor){
              diseaseSymptom.specificFor = false;
            }else{
              diseaseSymptom.specificFor = true;
            }        
          }
        }
      }

      containsElementSpecific(diseaseSymptoms:any[],symptom:any){
        for(let diseaseSymptom of diseaseSymptoms){
          if(diseaseSymptom.symptom.id==symptom.id){
            return diseaseSymptom.specificFor;
          }
        }

      }

}