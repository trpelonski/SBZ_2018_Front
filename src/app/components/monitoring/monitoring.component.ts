import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.css']
})
export class MonitoringComponent implements OnInit {

  constructor(private socketService : SocketService) { }

  private alerts : string[] = [];
  private realtimeStart = false;

  ngOnInit() {
    this.socketService.initSocket();
  }

  removeAlert(index:number){
    this.alerts.splice(index,1);
  }

  start(mode:string){
    if(mode=="REAL_TIME"){
      var message = {token:localStorage.getItem('logovanKorisnik'),mode:"REAL_TIME"};
      this.realtimeStart = true;
    }else if(mode=="PSEUDO"){
      var message = {token:localStorage.getItem('logovanKorisnik'),mode:"PSEUDO"};
    }
    
    this.socketService.send(message);

    this.socketService.getSocket().onmessage = (event) => { 
      this.alerts.push(event.data);
    }
  }

  stop(){
    this.realtimeStart = false;

    this.socketService.closeSocket();

    this.socketService.initSocket();
  }
}
