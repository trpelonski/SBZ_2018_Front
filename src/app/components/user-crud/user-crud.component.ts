import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../services/crud.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog } from '@angular/material';
import { UserDialogComponent } from '../dialogs/user-dialog/user-dialog.component';

@Component({
  selector: 'app-user-crud',
  templateUrl: './user-crud.component.html',
  styleUrls: ['./user-crud.component.css']
})
export class UserCrudComponent implements OnInit {

  korisniciStranica : number = 1;
  users : any;

  constructor(private crudService : CrudService, private editDialog: MatDialog) { }

  ngOnInit() {
    this.ucitajKorisnike();
  }

  ucitajKorisnike(){
    this.crudService.getUsers(this.korisniciStranica).subscribe((res:any)=>{
      if(res.success){
        this.users = res.body.content;
      }
    })
  }

  deleteUser(id:number){
    this.crudService.deleteUser(id).subscribe((res:any)=>{
      if(res.success){
        this.ucitajKorisnike();
      }
    })
  }

  nextUsers(){
    this.crudService.getUsers(this.korisniciStranica+1).subscribe((res:any)=>{
      if(res.success){
        if(res.body){
          this.users = res.body.content;
          this.korisniciStranica++;
        }
      }
    })
  }

  prevUsers(){
    this.korisniciStranica--;
    if(this.korisniciStranica <= 1){
      this.korisniciStranica = 1;
    }

    this.ucitajKorisnike();
  }

  newUser = function(){

    let dialogRef = this.editDialog.open(UserDialogComponent, {
      data: {},
      disableClose: false
    })

    dialogRef.afterClosed().subscribe( (result:any) => {
      if(result != null){
        this.ucitajKorisnike();
      }
    })

  }
}
