import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CentralComponent } from './components/central/central.component';
import { LoginService } from './services/login.service';
import { AlertComponent } from './directives/alert.component';
import { AlertService } from './services/alert.service';
import { DijagnozaComponent } from './components/dijagnoza/dijagnoza.component';
import { PacijentiComponent } from './components/pacijenti/pacijenti.component';
import { DiagnosticService } from './services/diagnostic.service';
import { LecenjeComponent } from './components/lecenje/lecenje.component';
import { LekoviComponent } from './components/lekovi/lekovi.component';


var routes = [
  {
    path : '',
    component : CentralComponent
  },
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path : 'dijagnoza',
    component : DijagnozaComponent
  }
]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CentralComponent,
    AlertComponent,
    DijagnozaComponent,
    PacijentiComponent,
    LecenjeComponent,
    LekoviComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AlertService,LoginService, DiagnosticService],
  bootstrap: [AppComponent]
})
export class AppModule { }
