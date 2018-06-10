import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-potvrda',
  templateUrl: './potvrda.component.html',
  styleUrls: ['./potvrda.component.css']
})
export class PotvrdaComponent implements OnInit {

  @Output() previousStepEmitter = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  previousStep(){
    this.previousStepEmitter.emit();
  }

}
