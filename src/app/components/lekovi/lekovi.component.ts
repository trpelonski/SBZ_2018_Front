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
  private valid : boolean = true;
  private allergicTo : any[] = [];

  @Output() previousStepEmitter = new EventEmitter();
  @Output() nextStepEmitter = new EventEmitter();
  
  constructor(private diagnosticService : DiagnosticService, private alertService : AlertService) { }

  ngOnInit() {
    this.dobaviLekove();
    this.selectedMedications = this.diagnosticService.getSelectedMedications();
  }

  previousStep(){
    this.previousStepEmitter.emit();
  }

  dobaviLekove(){
    this.diagnosticService.getMedications().subscribe((res:any)=>{
      if(res.success){
        this.medications = res.body;
      }
    })
  }

  selectMedication(medication:any){
    var index = this.containsElement(this.selectedMedications,medication);
    if(index==-1){
      this.valid = false;
      this.selectedMedications.push(medication);
    }else{
      this.selectedMedications.splice(index,1);
    }

    index = this.containsElement(this.allergicTo,medication);
    if(index!=-1){
      this.allergicTo.splice(index,1);
    }

    if(this.selectedMedications.length==0){
      this.valid = true;
    }

  }

  isNextAvailable(){
    return this.valid && this.allergicTo.length==0;
  }

  setData(){
    this.diagnosticService.setSelectedMedications(this.selectedMedications);
    this.nextStepEmitter.emit();
  }

  validiraj(){
    this.diagnosticService.CheckAlergicTo(this.selectedMedications).subscribe((res:any)=>{
      if(res.success){
        this.allergicTo = res.body.allergicTo;
        this.valid = true;
        if(this.allergicTo.length!=0){
          this.alertService.error("Pacijent je alergican na oznacene lekove ili sastojke u njima! Uklonite ove lekove da biste mogli da nastavite");
        }
      }
    })
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
