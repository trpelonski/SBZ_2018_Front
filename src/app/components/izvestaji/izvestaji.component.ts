import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-izvestaji',
  templateUrl: './izvestaji.component.html',
  styleUrls: ['./izvestaji.component.css']
})
export class IzvestajiComponent implements OnInit {

  constructor(private reportService : ReportService, private router : Router) { }

  private hronicni : any;
  private zavisnici : any;
  private imunitet : any;

  ngOnInit() {
    var korisnikToken = localStorage.getItem('logovanKorisnik');
    if(!korisnikToken){
      this.router.navigate(['']);
    }else{
      var logovanKorisnik = JSON.parse(window.atob(korisnikToken.split('.')[1]));
      var uloga = logovanKorisnik.role[0].authority;
      if(uloga!='1'){
        this.router.navigate(['']);
      }else {
        this.getPotentialChronicDiseasePatients();
      }
    }
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
