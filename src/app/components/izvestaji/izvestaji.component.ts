import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-izvestaji',
  templateUrl: './izvestaji.component.html',
  styleUrls: ['./izvestaji.component.css']
})
export class IzvestajiComponent implements OnInit {

  constructor(private reportService : ReportService) { }

  private hronicni : any;
  private zavisnici : any;
  private imunitet : any;

  ngOnInit() {
    this.getPotentialChronicDiseasePatients();
  }

  getPotentialChronicDiseasePatients(){
    this.reportService.getPotentialChronicDiseasePatients().subscribe((res:any)=>{
      this.hronicni = res.body;
    })
  }

  getPotentialAddicts(){
    this.reportService.getPotentialAddicts().subscribe((res:any)=>{
      this.zavisnici = res.body;
    })
  }

  getPotentialWeakImmunityPatients(){
    this.reportService.getPotentialWeakImmunityPatients().subscribe((res:any)=>{
      this.imunitet = res.body;
    })
  }

}
