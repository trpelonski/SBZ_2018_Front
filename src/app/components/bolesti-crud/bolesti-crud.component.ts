import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-bolesti-crud',
  templateUrl: './bolesti-crud.component.html',
  styleUrls: ['./bolesti-crud.component.css']
})
export class BolestiCrudComponent implements OnInit {

  bolestiStranica : number = 1;
  bolesti : any;

  constructor(private crudService : CrudService) { }

  ngOnInit() {
    this.ucitajBolesti();
  }

  ucitajBolesti(){
    this.crudService.getDiseases(this.bolestiStranica).subscribe((res:any)=>{
      if(res.success){
        this.bolesti = res.body.content;
      }
    })
  }

  deleteBolest(id:number){
    this.crudService.deleteDisease(id).subscribe((res:any)=>{
      if(res.success){
        this.ucitajBolesti();
      }
    })
  }

  nextBolesti(){
    this.crudService.getDiseases(this.bolestiStranica+1).subscribe((res:any)=>{
      if(res.success){
        if(res.body){
          this.bolesti = res.body.content;
          this.bolestiStranica++;
        }
      }
    })
  }

  prevBolesti(){
    this.bolestiStranica--;
    if(this.bolestiStranica <= 1){
      this.bolestiStranica = 1;
    }

    this.ucitajBolesti();
  }

}
