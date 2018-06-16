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
import { PotvrdaComponent } from './components/potvrda/potvrda.component';
import { MedicationsPipe } from './pipes/medications.pipe';
import { DiseasesPipe } from './pipes/diseases.pipe';
import { SymptomsPipe } from './pipes/symptoms.pipe';
import { IzvestajiComponent } from './components/izvestaji/izvestaji.component';
import { ReportService } from './services/report.service';
import { LekoviCrudComponent } from './components/lekovi-crud/lekovi-crud.component';
import { SubstanceCrudComponent } from './components/substance-crud/substance-crud.component';
import { BolestiCrudComponent } from './components/bolesti-crud/bolesti-crud.component';
import { SimptomiCrudComponent } from './components/simptomi-crud/simptomi-crud.component';
import { CrudService } from './services/crud.service';
import { AppLoadModule } from './appLoadModule';
import { MonitoringComponent } from './components/monitoring/monitoring.component';
import { SocketService } from './services/socket.service';
import { SubstancesPipe } from './pipes/substances.pipe';
import { DiseaseSymptomsPipe } from './pipes/disease-symptoms.pipe';
import { UserCrudComponent } from './components/user-crud/user-crud.component';
import { PatientCrudComponent } from './components/patient-crud/patient-crud.component';
import { DiagnosticCrudComponent } from './components/diagnostic-crud/diagnostic-crud.component';


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
  },
  {
    path : 'izvestaji',
    component : IzvestajiComponent
  },
  {
    path : 'monitoring',
    component : MonitoringComponent
  },
  {
    path : 'lekovi',
    component : LekoviCrudComponent
  },
  {
    path : 'substance',
    component : SubstanceCrudComponent
  },
  {
    path : 'bolesti',
    component : BolestiCrudComponent
  },
  {
    path : 'simptomi',
    component : SimptomiCrudComponent
  },
  {
    path : 'korisnici',
    component : UserCrudComponent
  },
  {
    path : 'pacijenti',
    component : PatientCrudComponent
  },
  {
    path : 'dijagnoze',
    component : DiagnosticCrudComponent
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
    LekoviComponent,
    PotvrdaComponent,
    MedicationsPipe,
    DiseasesPipe,
    SymptomsPipe,
    IzvestajiComponent,
    LekoviCrudComponent,
    SubstanceCrudComponent,
    BolestiCrudComponent,
    SimptomiCrudComponent,
    MonitoringComponent,
    SubstancesPipe,
    DiseaseSymptomsPipe,
    UserCrudComponent,
    PatientCrudComponent,
    DiagnosticCrudComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppLoadModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AlertService,LoginService, DiagnosticService, ReportService, CrudService, SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
