import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DiagnosticService } from '../../services/diagnostic.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-lekovi',
  templateUrl: './lekovi.component.html',
  styleUrls: ['./lekovi.component.css']
})
export class LekoviComponent implements OnInit {

  private medications : any[];
  private lekoviStranica : number = 1;
  private searchLekovi: boolean = false;
  private searchLekoviText : string = "";
  private searchLekoviZaSlanje : string = "";
  private diagnosticDiseases : any[] = [];
  private activeDisease : any;

  @Output() previousStepEmitter = new EventEmitter();
  @Output() nextStepEmitter = new EventEmitter();
  
  constructor(private diagnosticService : DiagnosticService, private alertService : AlertService) { }

  ngOnInit() {
    this.dobaviLekove();
    this.createDiagnoscicDiseases();
  }

  previousStep(){
    this.previousStepEmitter.emit();
  }

  dobaviLekove(){
    if(!this.searchLekovi){
      this.diagnosticService.getMedications(this.lekoviStranica).subscribe((res:any)=>{
        if(res.success){
          this.medications = res.body.content;
        }
      })
    }else{
      this.diagnosticService.findMedications(this.lekoviStranica,this.searchLekoviZaSlanje).subscribe((res:any)=>{
        if(res.success){
          this.medications = res.body.content;
        }
      })
    }
  }

  prevLekovi(){
    this.lekoviStranica--;
    if(this.lekoviStranica <= 1){
      this.lekoviStranica = 1;
    }

    this.dobaviLekove();
  }

  nextLekovi(){
    var medications;
    if(!this.searchLekovi){
      this.diagnosticService.getMedications(this.lekoviStranica+1).subscribe((res:any)=>{
        if(res.success){
          medications = res.body.content;
          for(let medication of this.medications){
            if(this.containsElement(medications,medication)==-1){
              this.lekoviStranica++;
              this.medications = medications;
              break;
            }
          }
        }
      });
    }else{
      this.diagnosticService.findMedications(this.lekoviStranica+1,this.searchLekoviZaSlanje).subscribe((res:any)=>{
        if(res.success){
          medications= res.body.content;
          for(let medication of this.medications){
            if(this.containsElement(medications,medication)==-1){
              this.lekoviStranica++;
              this.medications = medications;
              break;
            }
          }
        }
      });
    }
  }

  selectMedication(medication:any){
    var index = this.containsElement(this.activeDisease.medications,medication);
    if(index==-1){
      this.activeDisease.valid++;
      this.activeDisease.medications.push(medication);
    }else{
      this.activeDisease.medications.splice(index,1);
      if(this.activeDisease.valid>0){
        this.activeDisease.valid--;
      }
      
    }
    index = this.containsElement(this.activeDisease.allergicTo,medication);
    if(index!=-1){
      this.activeDisease.allergicTo.splice(index,1);
    }  
  }

  createDiagnoscicDiseases(){
    var diseases = this.diagnosticService.getSelectedDiseases();

    for(let disease of diseases){
      var diagnosticDisease = {disease : disease, medications : [], valid : 0, allergicTo : []}
      this.diagnosticDiseases.push(diagnosticDisease);
    }
  }

  changeActiveDisease(id:any){

    for(let diagnosticDisease of this.diagnosticDiseases){
      if(diagnosticDisease.disease.id==id){
        this.activeDisease = diagnosticDisease;
        break;
      }
    }
  }

  isNextAvailable(){
    for(let diagnosticDisease of this.diagnosticDiseases){
      if(diagnosticDisease.valid!=0 || diagnosticDisease.allergicTo.length!=0){
        return false;
      }
    }
    return true;
  }

  setData(){
    this.diagnosticService.setDiagnosticDiseases(this.diagnosticDiseases);
    this.nextStepEmitter.emit();
  }

  validiraj(){
    this.diagnosticService.CheckAlergicTo(this.activeDisease.medications).subscribe((res:any)=>{
      if(res.success){
        this.activeDisease.allergicTo = res.body.allergicTo;
        this.activeDisease.valid = 0;
        if(this.activeDisease.allergicTo.length!=0){
          this.alertService.error("Pacijent je alergican na oznacene lekove ili sastojke u njima! Uklonite ove lekove da biste mogli da nastavite");
        }
      }
    })
  }

  pretraziLekove(){
    this.searchLekovi = true;
    this.lekoviStranica = 1;
    this.searchLekoviZaSlanje = this.searchLekoviText;
    this.dobaviLekove();
  }

  osveziLekove(){
    this.searchLekovi = false;
    this.lekoviStranica = 1;
    this.searchLekoviZaSlanje = "";
    this.searchLekoviText = "";
    this.dobaviLekove();
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
