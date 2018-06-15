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

    this.socketService.getSocket().onmessage = (event) => { 
      this.alerts.push(event.data);
    }

  }

  removeAlert(alert:string){
    var index = this.alerts.indexOf(alert);
    this.alerts.splice(index,1);
  }
}
