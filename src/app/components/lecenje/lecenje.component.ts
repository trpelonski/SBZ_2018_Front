import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DiagnosticService } from '../../services/diagnostic.service';

@Component({
  selector: 'app-lecenje',
  templateUrl: './lecenje.component.html',
  styleUrls: ['./lecenje.component.css']
})
export class LecenjeComponent implements OnInit {

  @Output() previousStepEmitter = new EventEmitter();
  @Output() nextStepEmitter = new EventEmitter();
  private symptoms : any;
  private kartonBr: string;
  private diseases : any[];
  private operationNum : number = -1;
  private selectedSymptoms : any[] = [];
  private diseaseSymptoms : any[];
  private allDiseases : any[];
  private mostLikelyDiseases : any[];
  private selectedDiseases : any[] = [];

  constructor(private diagnosticService : DiagnosticService) { }

  ngOnInit() {
    this.dobaviSimptome();
    this.dobaviBolesti();
    this.kartonBr = this.diagnosticService.getPatient().stringId;
    this.selectedSymptoms = this.diagnosticService.getSelectedSymptoms();
    this.selectedDiseases = this.diagnosticService.getSelectedDiseases();
  }

  getMostLikelyDisease(){
    this.operationNum = 1;
    this.diagnosticService.getMostLikelyDisease(this.selectedSymptoms).subscribe((res:any)=>{
      if(res.success){
        this.mostLikelyDiseases = res.body;
      }
    })
  }

  getDiseaseSymptoms(id:number){
    this.diagnosticService.getDiseaseSymptoms(id).subscribe((res:any)=>{
      if(res.success){
        this.diseaseSymptoms = res.body;
      } 
    })
  }

  getSymptomsDisease(){
    this.operationNum=2;
    this.diagnosticService.getSymptomsDiseases(this.selectedSymptoms).subscribe((res:any)=>{
      if(res.success){
        this.allDiseases = res.body;
      } 
    })
  }

  showDiseaseSymptoms(){
    this.diseaseSymptoms = null; 
    this.operationNum = 3;
  }

  showMyDiagnostic(){
    this.operationNum = 4;
  }

  bindSymptom(symptom:any){
    var index = this.containsElement(this.selectedSymptoms,symptom);
    if(index==-1){
      this.selectedSymptoms.push(symptom);
    }else{
      this.selectedSymptoms.splice(index,1);
    }
  }

  addOrRemoveSelectedDisease(disease:any){
    var index = this.containsElement(this.selectedDiseases,disease);
    if(index==-1){
      this.selectedDiseases.push(disease);
    }else{
      this.selectedDiseases.splice(index,1);
    }
  }

  previousStep(){
    this.previousStepEmitter.emit();
  }

  dobaviSimptome(){
    this.diagnosticService.getSymptoms().subscribe((res:any)=>{
      if(res.success){
        this.symptoms = res.body;
      }
    });
  }

  dobaviBolesti(){
    this.diagnosticService.getDiseases().subscribe((res:any)=>{
      if(res.success){
        this.diseases = res.body;
      }
    });
  }

  ponisti(){
    this.selectedDiseases = [];
    this.operationNum = -1;
  }

  dalje(){
    this.diagnosticService.setSelectedSymptoms(this.selectedSymptoms);
    this.diagnosticService.setSelectedDiseases(this.selectedDiseases);
    this.nextStepEmitter.emit();
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
