import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable()
export class DiagnosticService {

  private patient : any;
  private selectedSymptoms : any[] = [];
  private selectedDiseases : any[] = [];

  constructor(private httpClient : HttpClient) { }

  getPatients(page:number){
    return this.httpClient.get('/app/secured/getPatients/'+page,{headers : this.postaviHeadere()});
  }

  searchPatients(page:number,name:string){
    let params = new HttpParams();   
    params = params.append('name', name);
    return this.httpClient.get('/app/secured/findPatients/'+page,{params:params, headers : this.postaviHeadere()});
  }  

  getSymptoms(){
    return this.httpClient.get('/app/secured/getSymptoms',{headers : this.postaviHeadere()});
  }

  getDiseases(){
    return this.httpClient.get('/app/secured/getDiseases',{headers : this.postaviHeadere()});
  }

  getMedications(){
    return this.httpClient.get('/app/secured/getMedications',{headers : this.postaviHeadere()});
  }

  getMostLikelyDisease(symptoms:any[]){
    var diagnostic = {'patient' : this.patient, 'symptoms' : symptoms, 'diseases' : []};
    return this.httpClient.post('/app/secured/getMostLikelyDisease',diagnostic,{headers : this.postaviHeadere()});
  }

  getDiseaseSymptoms(diseaseId:number){
    return this.httpClient.get('/app/secured/getDiseaseSymptoms/'+diseaseId,{headers : this.postaviHeadere()});
  }

  getgetSymptomsDiseases(symptoms:any[]){
    return this.httpClient.post('/app/secured/getSymptomsDiseases',symptoms,{headers : this.postaviHeadere()});
  }

  getPatient() : any{
    return this.patient;
  }

  setPatient(patient : any){
    this.patient = patient;
  }

  getSelectedSymptoms() : any[]{
    return this.selectedSymptoms;
  }

  setSelectedSymptoms(selectedSymptoms : any[]){
    this.selectedSymptoms = selectedSymptoms;
  }

  getSelectedDiseases() : any[]{
    return this.selectedDiseases;
  }

  setSelectedDiseases(selectedDiseases : any[]){
    this.selectedDiseases = selectedDiseases;
  }

  postaviHeadere(){
    let headers = new HttpHeaders();
    headers = headers.set('token', localStorage.getItem('logovanKorisnik'));

    return headers;
  }
}
