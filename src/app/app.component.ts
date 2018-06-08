import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  
  private logovanKorisnik : any;
  private korisnikToken : string;
  private uloga : string;

  ngOnInit(){
    AppComponent.updateUserStatus.subscribe(res => {
      this.korisnikToken = localStorage.getItem('logovanKorisnik');
      this.logovanKorisnik = JSON.parse(window.atob(this.korisnikToken.split('.')[1]));
      this.uloga = this.logovanKorisnik.role[0].authority;
    })

    this.korisnikToken = localStorage.getItem('logovanKorisnik');
    if(this.korisnikToken){
      this.logovanKorisnik = JSON.parse(window.atob(this.korisnikToken.split('.')[1]));
      this.uloga = this.logovanKorisnik.role[0].authority;
    }
  }

  constructor(){}

  odjava(){
    localStorage.removeItem('logovanKorisnik');
    window.location.reload();
  }

  public static updateUserStatus: Subject<boolean> = new Subject();

}
