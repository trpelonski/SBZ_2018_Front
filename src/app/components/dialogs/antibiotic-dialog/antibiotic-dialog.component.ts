import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, throwMatDialogContentAlreadyAttachedError } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { CrudService } from '../../../services/crud.service';

@Component({
  selector: 'app-antibiotic-dialog',
  templateUrl: './antibiotic-dialog.component.html',
  styleUrls: [ ]
})
export class AntibioticDialogComponent implements OnInit {

  private antibiotic: any = {name : '', substances: [], type: {id: -1, name : ''}};
  private substances: any[];

  constructor(public editDialog: MatDialog, public dialogRef: MatDialogRef<AntibioticDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, private crudService: CrudService) { }

  ngOnInit() {

    if(this.data.val != null){
      Object.assign(this.antibiotic,this.data.val);
    }

    this.crudService.getAllSubstances().subscribe((res: any) => {
      this.substances = res.body;
    });
    
  }

  potvrdi = function(){

    if(this.data.mode == 0){
      this.crudService.insertMedication(this.antibiotic).subscribe((res: any) => {
        this.dialogRef.close(res.body);
      });
    }else{
      this.crudService.updateMedication(this.antibiotic).subscribe((res: any) => {
        this.dialogRef.close(res.body);
      });
    }
    
  }

  zatvori = function(){
    this.dialogRef.close(null);
  }

  bindSubstance(substance: any){
    var index = this.containsElement(this.antibiotic.substances, substance);
    if(index==-1){
      this.antibiotic.substances.push(substance);
    }else{
      this.antibiotic.substances.splice(index,1);
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
