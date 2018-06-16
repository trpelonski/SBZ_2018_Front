import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../services/crud.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog } from '@angular/material';
import { SymptomComponent } from '../dialogs/sympton/sympton.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-simptomi-crud',
  templateUrl: './simptomi-crud.component.html',
  styleUrls: ['./simptomi-crud.component.css']
})
export class SimptomiCrudComponent implements OnInit {

  simptomiStranica : number = 1;
  simptomi : any;

  constructor(private crudService : CrudService, private editDialog: MatDialog, private router : Router) { }

  ngOnInit() {
    var korisnikToken = localStorage.getItem('logovanKorisnik');
    if(!korisnikToken){
      this.router.navigate(['']);
    }else{
      var logovanKorisnik = JSON.parse(window.atob(korisnikToken.split('.')[1]));
      var uloga = logovanKorisnik.role[0].authority;
      if(uloga!='2'){
        this.router.navigate(['']);
      }else{
        this.ucitajSimptome();
      }
    }
  }

  ucitajSimptome(){
    this.crudService.getSymptoms(this.simptomiStranica).subscribe((res:any)=>{
      if(res.success){
        this.simptomi = res.body.content;
      }
    })
  }

  deleteSymptom(id:number){
    this.crudService.deleteSymptom(id).subscribe((res:any)=>{
      if(res.success){
        this.ucitajSimptome();
      }
    })
  }

  nextSimptomi(){
    this.crudService.getSymptoms(this.simptomiStranica+1).subscribe((res:any)=>{
      if(res.success){
        if(res.body){
          this.simptomi = res.body.content;
          this.simptomiStranica++;
        }
      }
    })
  }

  prevSimptomi(){
    this.simptomiStranica--;
    if(this.simptomiStranica <= 1){
      this.simptomiStranica = 1;
    }

    this.ucitajSimptome();
  }

  editSymptom = function(val: any){

    let dialogRef = this.editDialog.open(SymptomComponent, {
      data: {val: val, mode: 1},
      disableClose: false
    })

    dialogRef.afterClosed().subscribe( (result:any) => {
      if(result != null){
        this.ucitajSimptome();
      }
    })

  }

  newSymptiom = function(){

    let dialogRef = this.editDialog.open(SymptomComponent, {
      data: {val: null, mode: 0},
      disableClose: false
    })

    dialogRef.afterClosed().subscribe( (result:any) => {
      if(result != null){
        this.ucitajSimptome();
      }
    })

  }

}
