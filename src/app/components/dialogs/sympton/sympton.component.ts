import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, throwMatDialogContentAlreadyAttachedError } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { CrudService } from '../../../services/crud.service';

@Component({
  selector: 'app-sympton',
  templateUrl: './sympton.component.html',
  styleUrls: [ ]
})
export class SymptomComponent implements OnInit {

  private symptomForm: any;

  constructor(public editDialog: MatDialog, public dialogRef: MatDialogRef<SymptomComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, private crudService: CrudService) { }

  ngOnInit() {

    this.symptomForm = new FormGroup({
      name : new FormControl(this.data.mode == 0 ? "" : this.data.val.name,Validators.compose([
        Validators.required,
        Validators.maxLength(120)
      ])),
      codeName : new FormControl({value: this.data.mode == 0 ? "" : this.data.val.codeName, disabled: this.data.mode == 1}, Validators.compose([
        Validators.required,
        Validators.maxLength(120)
      ])),
      toShow : new FormControl(this.data.mode == 0 ? "" : this.data.val.toShow)
    });

  }

  potvrdi = function(){

    let val = this.symptomForm.getRawValue();

    if(!val.toShow){
      val.toShow = false;
    }

    if(this.data.mode == 0){
      this.crudService.insertSymptom(val).subscribe((res: any) =>{
        this.dialogRef.close(res.body);
      })
    }else{
      let forEdit = val;
      forEdit.id = this.data.val.id;
      this.crudService.updateSymptom(forEdit).subscribe((res: any) =>{
        this.dialogRef.close(res.body);
      })
    }

  }

  zatvori = function(){
    this.dialogRef.close(null);
  }

}
