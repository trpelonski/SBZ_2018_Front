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

  ngOnInit() {
    this.socketService.initSocket();
  }

  removeAlert(index:number){
    this.alerts.splice(index,1);
  }

  start(){
    var message = {token:localStorage.getItem('logovanKorisnik')};
    this.socketService.send(message);

    this.socketService.getSocket().onmessage = (event) => { 
      this.alerts.push(event.data);
    }
  }

  stop(){
    this.socketService.closeSocket();

    this.socketService.initSocket();
  }
}
