import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DiagnosticService } from '../../services/diagnostic.service';

@Component({
  selector: 'app-pacijenti',
  templateUrl: './pacijenti.component.html',
  styleUrls: ['./pacijenti.component.css']
})
export class PacijentiComponent implements OnInit {

  @Output() nextStepEmitter = new EventEmitter();
  pacijentiStranica : number = 1;
  pacijenti : any[];
  searchPacijenti: boolean = false;
  searchPacijentiText : string = "";
  searchPacijentiZaSlanje : string = "";
  selected : any;

  constructor(private diagnosticService : DiagnosticService) { }

  ngOnInit() {
    this.selected = this.diagnosticService.getPatient();
    this.ucitajPacijente();
  }

  isNextAvailable(){
    if(this.selected){
      return true;
    }
    return false;
  }

  setData(){
    this.diagnosticService.setPatient(this.selected);
    this.nextStepEmitter.emit();
  }

  selectPatient(patient:any){
    this.selected = patient;
  }

  prevPacijenti(){
    this.pacijentiStranica--;
    if(this.pacijentiStranica <= 1){
      this.pacijentiStranica = 1;
    }

    this.ucitajPacijente();
  }

  nextPacijenti(){
    var pacijenti;
    if(!this.searchPacijenti){
      this.diagnosticService.getPatients(this.pacijentiStranica+1).subscribe((res:any)=>{
        if(res.success){
          pacijenti = res.body.content;
          for(let pacijent of this.pacijenti){
            if(!this.containsElement(pacijenti,pacijent)){
              this.pacijentiStranica++;
              this.pacijenti = pacijenti;
              break;
            }
          }
        }
      });
    }else{
      this.diagnosticService.searchPatients(this.pacijentiStranica+1,this.searchPacijentiZaSlanje).subscribe((res:any)=>{
        if(res.success){
          pacijenti= res.body.content;
          for(let pacijent of this.pacijenti){
            if(!this.containsElement(pacijenti,pacijent)){
              this.pacijentiStranica++;
              this.pacijenti = pacijenti;
              break;
            }
          }
        }
      });
    }
  }

  ucitajPacijente = function(){
    if(!this.searchPacijenti){
      this.diagnosticService.getPatients(this.pacijentiStranica).subscribe((res:any)=>{
        if(res.success){
          this.pacijenti = res.body.content;
        }
      })
    }else{
      this.diagnosticService.searchPatients(this.pacijentiStranica,this.searchPacijentiZaSlanje).subscribe((res:any)=>{
        if(res.success){
          this.pacijenti = res.body.content;
        }
      })
    }
  }

  pretraziPacijente = function(){
    this.searchPacijenti = true;
    this.pacijentiStranica = 1;
    this.searchPacijentiZaSlanje = this.searchPacijentiText;
    this.ucitajPacijente();
  }

  osveziPacijente = function(){
    this.searchPacijenti = false;
    this.pacijentiStranica = 1;
    this.searchPacijentiZaSlanje = "";
    this.searchPacijentiText = "";
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
