import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dijagnoza',
  templateUrl: './dijagnoza.component.html',
  styleUrls: ['./dijagnoza.component.css']
})
export class DijagnozaComponent implements OnInit {

  private step : number = 1;

  constructor() { }

  ngOnInit() {
  }

  nextStep(){
    this.step++;
  }

  previousStep(){
    this.step--;
  }

}
