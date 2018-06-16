import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../services/crud.service';
import { DiagnosticService } from '../../services/diagnostic.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog } from '@angular/material';
import { AntibioticDialogComponent } from '../dialogs/antibiotic-dialog/antibiotic-dialog.component';

@Component({
  selector: 'app-lekovi-crud',
  templateUrl: './lekovi-crud.component.html',
  styleUrls: ['./lekovi-crud.component.css']
})
export class LekoviCrudComponent implements OnInit {

  lekoviStranica : number = 1;
  lekovi : any;

  constructor(private crudService : CrudService, private diagnosticService : DiagnosticService, private editDialog: MatDialog) { }

  ngOnInit() {
    this.ucitajLekove();
  }

  ucitajLekove(){
    this.diagnosticService.getMedications(this.lekoviStranica).subscribe((res:any)=>{
      if(res.success){
        this.lekovi = res.body.content;
      }
    })
  }

  deleteLek(id:number){
    this.crudService.deleteMedication(id).subscribe((res:any)=>{
      if(res.success){
        this.ucitajLekove();
      }
    })
  }

  nextLekovi(){
    var medications;
    this.diagnosticService.getMedications(this.lekoviStranica+1).subscribe((res:any)=>{
      if(res.success){
        medications = res.body.content;
        for(let medication of this.lekovi){
          if(this.containsElement(medications,medication)==-1){
            this.lekoviStranica++;
            this.lekovi = medications;
            break;
          }
        }
      }
    });
  }

  prevLekovi(){
    this.lekoviStranica--;
    if(this.lekoviStranica <= 1){
      this.lekoviStranica = 1;
    }

    this.ucitajLekove();
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

  newMedication = function(){

    let dialogRef = this.editDialog.open(AntibioticDialogComponent, {
      data: {val: null, mode : 0},
      disableClose: false
    })

    dialogRef.afterClosed().subscribe( (result:any) => {
      if(result != null){
        this.ucitajLekove();
      }
    })
  }

  editMedication = function(val: any){

    let dialogRef = this.editDialog.open(AntibioticDialogComponent, {
      data: {val: val, mode : 1},
      disableClose: false
    })

    dialogRef.afterClosed().subscribe( (result:any) => {
      if(result != null){
        this.ucitajLekove();
      }
    })
  }

}
