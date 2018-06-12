import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DiagnosticService } from '../../services/diagnostic.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-potvrda',
  templateUrl: './potvrda.component.html',
  styleUrls: ['./potvrda.component.css']
})
export class PotvrdaComponent implements OnInit {

  @Output() previousStepEmitter = new EventEmitter();
  private description : string = "";
  private patient : any = {};
  private symptoms : any[] = [];
  private diagnosticDiseases : any[] = [];

  constructor(private diagnosticService : DiagnosticService, private router : Router) { }

  ngOnInit() {
    this.patient = this.diagnosticService.getPatient();
    this.diagnosticDiseases = this.diagnosticService.getDiagnosticDiseases();
    this.symptoms = this.diagnosticService.getSelectedSymptoms();
  }

  potvrda(){
    this.diagnosticService.insertDiagnostic(this.description).subscribe((res:any)=>{
      if(res.success){
        this.router.navigate(['']);
      }
    })
  }

  previousStep(){
    this.previousStepEmitter.emit();
  }

}
