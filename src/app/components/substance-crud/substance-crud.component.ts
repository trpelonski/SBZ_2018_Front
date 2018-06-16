import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../services/crud.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog } from '@angular/material';
import { SubstanceComponent } from '../dialogs/substance/substance.component';

@Component({
  selector: 'app-substance-crud',
  templateUrl: './substance-crud.component.html',
  styleUrls: ['./substance-crud.component.css']
})
export class SubstanceCrudComponent implements OnInit {

  substancesStranica : number = 1;
  substances : any;

  constructor(private crudService : CrudService, private editDialog: MatDialog) { }

  ngOnInit() {
    this.ucitajSubstance();
  }

  ucitajSubstance(){
    this.crudService.getSubstances(this.substancesStranica).subscribe((res:any)=>{
      if(res.success){
        this.substances = res.body.content;
      }
    })
  }

  deleteSubstance(id:number){
    this.crudService.deleteSubstance(id).subscribe((res:any)=>{
      if(res.success){
        this.ucitajSubstance();
      }
    })
  }

  nextSubstances(){
    this.crudService.getSubstances(this.substancesStranica+1).subscribe((res:any)=>{
      if(res.success){
        if(res.body){
          this.substances = res.body.content;
          this.substancesStranica++;
        }
      }
    })
  }

  prevSubstances(){
    this.substancesStranica--;
    if(this.substancesStranica <= 1){
      this.substancesStranica = 1;
    }

    this.ucitajSubstance();
  }

  addEditSubstance = function(val: any){

    let dialogRef = this.editDialog.open(SubstanceComponent, {
      data: {val: val, mode: 1},
      disableClose: false
    })

    dialogRef.afterClosed().subscribe( (result:any) => {
      if(result != null){
        this.ucitajSubstance();
      }
    })

  }

  newSubstance = function(){

    let dialogRef = this.editDialog.open(SubstanceComponent, {
      data: {val: null, mode: 0},
      disableClose: false
    })

    dialogRef.afterClosed().subscribe( (result:any) => {
      if(result != null){
        this.ucitajSubstance();
      }
    })

  }

}
