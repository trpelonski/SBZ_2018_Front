import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-lekovi',
  templateUrl: './lekovi.component.html',
  styleUrls: ['./lekovi.component.css']
})
export class LekoviComponent implements OnInit {

  @Output() previousStepEmitter = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

  previousStep(){
    this.previousStepEmitter.emit();
  }

}
