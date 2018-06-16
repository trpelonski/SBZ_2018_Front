import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, throwMatDialogContentAlreadyAttachedError } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { CrudService } from '../../../services/crud.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: []
})
export class UserDialogComponent implements OnInit {

  private userForm: any;

  constructor(public editDialog: MatDialog, public dialogRef: MatDialogRef<UserDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, private crudService: CrudService) { }

  ngOnInit() {

    this.userForm = new FormGroup({
      username : new FormControl("",Validators.compose([
        Validators.required,
        Validators.maxLength(120)
      ])),
      role : new FormControl("", Validators.compose([
        Validators.required
      ]))
    });

  }

  potvrdi = function(val: any){

    val.role = {id: val.role, name : ""};

    this.crudService.insertUser(val).subscribe((res: any) => {
      this.dialogRef.close(res.body);
    })
  }

  zatvori = function(){
    this.dialogRef.close(null);
  }

}
