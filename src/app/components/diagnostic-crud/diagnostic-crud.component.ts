import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-diagnostic-crud',
  templateUrl: './diagnostic-crud.component.html',
  styleUrls: ['./diagnostic-crud.component.css']
})
export class DiagnosticCrudComponent implements OnInit {

  dijagnozeStranica : number = 1;
  diagnostics : any;

  constructor(private crudService : CrudService) { }

  ngOnInit() {
    this.ucitajDijagnoze();
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
