import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-simptomi-crud',
  templateUrl: './simptomi-crud.component.html',
  styleUrls: ['./simptomi-crud.component.css']
})
export class SimptomiCrudComponent implements OnInit {

  simptomiStranica : number = 1;
  simptomi : any;

  constructor(private crudService : CrudService) { }

  ngOnInit() {
    this.ucitajSimptome();
  }

  ucitajSimptome(){
    this.crudService.getSymptoms(this.simptomiStranica).subscribe((res:any)=>{
      if(res.success){
        this.simptomi = res.body.content;
      }
    })
  }

  deleteSymptom(id:number){
    this.crudService.deleteSymptom(id).subscribe((res:any)=>{
      if(res.success){
        this.ucitajSimptome();
      }
    })
  }

  nextSimptomi(){
    this.crudService.getSymptoms(this.simptomiStranica+1).subscribe((res:any)=>{
      if(res.success){
        if(res.body){
          this.simptomi = res.body.content;
          this.simptomiStranica++;
        }
      }
    })
  }

  prevSimptomi(){
    this.simptomiStranica--;
    if(this.simptomiStranica <= 1){
      this.simptomiStranica = 1;
    }

    this.ucitajSimptome();
  }

}
