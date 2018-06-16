import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../services/crud.service';
import { DiagnosticService } from '../../services/diagnostic.service';

@Component({
  selector: 'app-patient-crud',
  templateUrl: './patient-crud.component.html',
  styleUrls: ['./patient-crud.component.css']
})
export class PatientCrudComponent implements OnInit {

  pacijentiStranica : number = 1;
  patients : any;

  constructor(private crudService : CrudService, private diagnosticService : DiagnosticService) { }

  ngOnInit() {
    this.ucitajPacijente();
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

}
