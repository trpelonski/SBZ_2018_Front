import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, throwMatDialogContentAlreadyAttachedError } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { CrudService } from '../../../services/crud.service';

@Component({
  selector: 'app-patient-dialog',
  templateUrl: './patient-dialog.component.html',
  styleUrls: [ ]
})
export class PatientDialogComponent implements OnInit {

  private patient: any = {name : "", surname : "", allergicToAntibiotic : [], allergicToSubstance : [] };

  private antibiotics: any[] = [];
  private substances: any[] = [];

  constructor(public editDialog: MatDialog, public dialogRef: MatDialogRef<PatientDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, private crudService: CrudService) { }

  ngOnInit() {

    if(this.data.val != null){
      Object.assign(this.patient, this.data.val);
    }

    this.crudService.getAllMedications().subscribe((res: any) => {
      this.antibiotics = res.body;
    });

    this.crudService.getAllSubstances().subscribe((res: any) => {
      this.substances = res.body;
    });

  }

  potvrdi = function(){

    console.log(this.patient)
    
    if(this.data.mode == 0){
      this.crudService.insertPatient(this.patient).subscribe((res: any) => {
        this.dialogRef.close(res.body);
      });
    }else{
      this.crudService.updatePatient(this.patient).subscribe((res: any) => {
        this.dialogRef.close(res.body);
      });
    }
    
  }

  zatvori = function(){
    this.dialogRef.close(null);
  }

  bindSubstance(substance: any){
    var index = this.containsElement(this.patient.allergicToSubstance, substance);
    if(index==-1){
      this.patient.allergicToSubstance.push(substance);
    }else{
      this.patient.allergicToSubstance.splice(index,1);
    }
  }

  bindAntibiotics(antibiotic: any){
    var index = this.containsElement(this.patient.allergicToAntibiotic, antibiotic);
    if(index==-1){
      this.patient.allergicToAntibiotic.push(antibiotic);
    }else{
      this.patient.allergicToAntibiotic.splice(index,1);
    }
  }

  containsElement(list:any[],element:any):number{
    var index = 0;
    for(let e of list){
      if(e.id==element.id){
        return index;
      }
      index++;
    }
    return -1;
  }

}
