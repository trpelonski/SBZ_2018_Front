import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../services/crud.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog } from '@angular/material';
import { DiseaseDialogComponent } from '../dialogs/disease-dialog/disease-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bolesti-crud',
  templateUrl: './bolesti-crud.component.html',
  styleUrls: ['./bolesti-crud.component.css']
})
export class BolestiCrudComponent implements OnInit {

  bolestiStranica : number = 1;
  bolesti : any;

  constructor(private crudService : CrudService,private editDialog: MatDialog, private router : Router) { }

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
        this.ucitajBolesti();
      }
    }
  }

  newDisease(){
    let dialogRef = this.editDialog.open(DiseaseDialogComponent, {
      data: {val: null, mode : 0},
      disableClose: false
    })

    dialogRef.afterClosed().subscribe( (result:any) => {
      if(result != null){
        this.ucitajBolesti();
      }
    })
  }

  editBolest(bolest:any){

      let dialogRef = this.editDialog.open(DiseaseDialogComponent, {
        data: {val: bolest, mode : 1},
        disableClose: false
      })
  
      dialogRef.afterClosed().subscribe( (result:any) => {
        if(result != null){
          this.ucitajBolesti();
        }
      })
  }

  ucitajBolesti(){
    this.crudService.getDiseases(this.bolestiStranica).subscribe((res:any)=>{
      if(res.success){
        this.bolesti = res.body.content;
      }
    })
  }

  deleteBolest(id:number){
    this.crudService.deleteDisease(id).subscribe((res:any)=>{
      if(res.success){
        this.ucitajBolesti();
      }
    })
  }

  nextBolesti(){
    this.crudService.getDiseases(this.bolestiStranica+1).subscribe((res:any)=>{
      if(res.success){
        if(res.body){
          this.bolesti = res.body.content;
          this.bolestiStranica++;
        }
      }
    })
  }

  prevBolesti(){
    this.bolestiStranica--;
    if(this.bolestiStranica <= 1){
      this.bolestiStranica = 1;
    }

    this.ucitajBolesti();
  }

}
