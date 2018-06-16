import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../services/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-diagnostic-crud',
  templateUrl: './diagnostic-crud.component.html',
  styleUrls: ['./diagnostic-crud.component.css']
})
export class DiagnosticCrudComponent implements OnInit {

  dijagnozeStranica : number = 1;
  diagnostics : any;

  constructor(private crudService : CrudService, private router : Router) { }

  ngOnInit() {
    var korisnikToken = localStorage.getItem('logovanKorisnik');
    if(!korisnikToken){
      this.router.navigate(['']);
    }else{
      var logovanKorisnik = JSON.parse(window.atob(korisnikToken.split('.')[1]));
      var uloga = logovanKorisnik.role[0].authority;
      if(uloga!='2'){
        this.router.navigate(['']);
      }else{
        this.ucitajDijagnoze();
      }
    }
  }

  ucitajDijagnoze(){
    this.crudService.getDiagnostics(this.dijagnozeStranica).subscribe((res:any)=>{
      if(res.success){
        this.diagnostics = res.body.content;
      }
    })
  }

  deleteDiagnostic(id:number){
    this.crudService.deleteDiagnostic(id).subscribe((res:any)=>{
      if(res.success){
        this.ucitajDijagnoze();
      }
    })
  }

  nextDiagnostic(){
    this.crudService.getDiagnostics(this.dijagnozeStranica+1).subscribe((res:any)=>{
      if(res.success){
        if(res.body){
          this.diagnostics = res.body.content;
          this.dijagnozeStranica++;
        }
      }
    })
  }

  prevDiagnostic(){
    this.dijagnozeStranica--;
    if(this.dijagnozeStranica <= 1){
      this.dijagnozeStranica = 1;
    }

    this.ucitajDijagnoze();
  }

}
