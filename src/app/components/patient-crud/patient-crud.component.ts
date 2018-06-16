import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../services/crud.service';
import { DiagnosticService } from '../../services/diagnostic.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog } from '@angular/material';
import { PatientDialogComponent } from '../dialogs/patient-dialog/patient-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-crud',
  templateUrl: './patient-crud.component.html',
  styleUrls: ['./patient-crud.component.css']
})
export class PatientCrudComponent implements OnInit {

  pacijentiStranica : number = 1;
  patients : any;

  constructor(private crudService : CrudService, private diagnosticService : DiagnosticService, private editDialog: MatDialog, private router : Router) { }

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
        this.ucitajPacijente();
      }
    }
  }

  ucitajPacijente(){
    this.diagnosticService.getPatients(this.pacijentiStranica).subscribe((res:any)=>{
      if(res.success){
        this.patients = res.body.content;
      }
    })
  }

  deletePatient(id:number){
    this.crudService.deletePatient(id).subscribe((res:any)=>{
      if(res.success){
        this.ucitajPacijente();
      }
    })
  }

  nextPatients(){
    var pacijenti;
    this.diagnosticService.getPatients(this.pacijentiStranica+1).subscribe((res:any)=>{
      if(res.success){
        pacijenti = res.body.content;
        for(let pacijent of this.patients){
          if(!this.containsElement(pacijenti,pacijent)){
            this.pacijentiStranica++;
            this.patients = pacijenti;
            break;
          }
        }
      }
    });
  }

  prevPatients(){
    this.pacijentiStranica--;
    if(this.pacijentiStranica <= 1){
      this.pacijentiStranica = 1;
    }

    this.ucitajPacijente();
  }

  containsElement(list:any[],element:any):boolean{

    for(let e of list){
      if(e.id==element.id){
        return true;
      }
    }
    return false;
  }

  newPatient = function(){

    let dialogRef = this.editDialog.open(PatientDialogComponent, {
      data: {val: null, mode: 0},
      disableClose: false
    })

    dialogRef.afterClosed().subscribe( (result:any) => {
      if(result != null){
        this.ucitajPacijente();
      }
    })

  }

  editPatient = function(val: any){

    let dialogRef = this.editDialog.open(PatientDialogComponent, {
      data: {val: val, mode: 1},
      disableClose: false
    })

    dialogRef.afterClosed().subscribe( (result:any) => {
      if(result != null){
        this.ucitajPacijente();
      }
    })

  }

}
