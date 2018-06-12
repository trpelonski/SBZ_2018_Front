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
  private selectedMedications : any[] = [];
  private valid : number = 0;
  private allergicTo : any[] = [];
  private lekoviStranica : number = 1;
  private searchLekovi: boolean = false;
  private searchLekoviText : string = "";
  private searchLekoviZaSlanje : string = "";
  private diagnosticDiseases : any[] = [];

  @Output() previousStepEmitter = new EventEmitter();
  @Output() nextStepEmitter = new EventEmitter();
  
  constructor(private diagnosticService : DiagnosticService, private alertService : AlertService) { }

  ngOnInit() {
    this.dobaviLekove();
    this.selectedMedications = this.diagnosticService.getSelectedMedications();
    this.createDiagnoscicDiseases();
    console.log(this.diagnosticDiseases);
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
    var index = this.containsElement(this.selectedMedications,medication);
    if(index==-1){
      this.valid++;
      this.selectedMedications.push(medication);
    }else{
      this.selectedMedications.splice(index,1);
      if(this.valid>0){
        this.valid--;
      }
      
    }

    index = this.containsElement(this.allergicTo,medication);
    if(index!=-1){
      this.allergicTo.splice(index,1);
    }  
  }

  isNextAvailable(){
    return this.valid==0 && this.allergicTo.length==0;
  }

  setData(){
    this.diagnosticService.setSelectedMedications(this.selectedMedications);
    this.nextStepEmitter.emit();
  }

  validiraj(){
    this.diagnosticService.CheckAlergicTo(this.selectedMedications).subscribe((res:any)=>{
      if(res.success){
        this.allergicTo = res.body.allergicTo;
        this.valid = 0;
        if(this.allergicTo.length!=0){
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

  createDiagnoscicDiseases(){
    var diseases = this.diagnosticService.getSelectedDiseases();

    for(let disease of diseases){
      var diagnosticDisease = {disease : disease, medications : []}
      this.diagnosticDiseases.push(diagnosticDisease);
    }
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
