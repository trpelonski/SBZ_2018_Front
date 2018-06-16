import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { CrudService } from '../../../services/crud.service';

@Component({
  selector: 'app-substance',
  templateUrl: './substance.component.html',
  styleUrls: [ ]
})
export class SubstanceComponent implements OnInit {

  private substanceForm: any;

  constructor(public editDialog: MatDialog, public dialogRef: MatDialogRef<SubstanceComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, private crudService: CrudService) { }

  ngOnInit() {

    console.log(this.data);

    this.substanceForm = new FormGroup({
      name : new FormControl(this.data.mode == 0 ? "" : this.data.val.name,Validators.compose([
        Validators.required,
        Validators.maxLength(120)
      ]))
    });

  }

  potvrdi = function(val: any){

    console.log(val)

    if(this.data.mode == 0){
      this.crudService.insertSubstance(val).subscribe((res: any)=>{
        this.dialogRef.close(res.body);
      });

    }else{
      let forUpdate = this.data.val;
      forUpdate.name = val.name;
      this.crudService.updateSubstance(forUpdate).subscribe((res: any)=>{
        this.dialogRef.close(res.body);
      });
    }
  }

  zatvori = function(){

    this.dialogRef.close(null);

  }
}
