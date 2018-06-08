import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, AbstractControl, ValidatorFn} from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private prijavaForma : FormGroup;

  constructor(private loginService : LoginService, private router : Router, private alertService : AlertService) { }

  ngOnInit() {
    this.prijavaForma = new FormGroup({
      username : new FormControl(""),
      password : new FormControl("")
    })
  }

  prijava(user){
    this.loginService.prijaviSe(user).subscribe((res:any)=>{
      if(res.success){
        localStorage.setItem('logovanKorisnik',res.body);
        AppComponent.updateUserStatus.next(true);
        this.router.navigate(['']);
      }else{
        this.alertService.error(res.message);
      }
    });
  }

}
