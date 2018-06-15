import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable()
export class CrudService {

  constructor(private httpClient : HttpClient) { }

  getUsers(page:number){
    return this.httpClient.get('/app/secured/getUsers/'+page,{headers : this.postaviHeadere()})
  }

  insertUser(user:any){
    return this.httpClient.post('/app/secured/insertUser',user,{headers : this.postaviHeadere()});
  }

  updateUser(user:any){
    return this.httpClient.put('/app/secured/updateUser',user,{headers : this.postaviHeadere()})
  }

  deleteUser(id:any){
    let params = new HttpParams();   
    params = params.append('id', id);

    return this.httpClient.delete('/app/secured/deleteUser',{params:params,headers:this.postaviHeadere()})
  }

  getSymptoms(page:number){
    return this.httpClient.get('/app/secured/getSymptoms/'+page,{headers : this.postaviHeadere()})
  }

  insertSymptom(symptom:any){
    return this.httpClient.post('/app/secured/insertSymptom',symptom,{headers : this.postaviHeadere()});
  }

  updateSymptom(symptom:any){
    return this.httpClient.put('/app/secured/updateSymptom',symptom,{headers : this.postaviHeadere()})
  }

  deleteSymptom(id:any){
    let params = new HttpParams();   
    params = params.append('id', id);

    return this.httpClient.delete('/app/secured/deleteSymptom',{params:params,headers:this.postaviHeadere()})
  }

  getSubstances(page:number){
    return this.httpClient.get('/app/secured/getSubstances/'+page,{headers : this.postaviHeadere()})
  }

  insertSubstance(substance:any){
    return this.httpClient.post('/app/secured/insertSubstance',substance,{headers : this.postaviHeadere()});
  }

  updateSubstance(substance:any){
    return this.httpClient.put('/app/secured/updateSubstance',substance,{headers : this.postaviHeadere()})
  }

  deleteSubstance(id:any){
    let params = new HttpParams();   
    params = params.append('id', id);

    return this.httpClient.delete('/app/secured/deleteSubstance',{params:params,headers:this.postaviHeadere()})
  }

  insertPatient(patient:any){
    return this.httpClient.post('/app/secured/insertPatient',patient,{headers : this.postaviHeadere()});
  }

  updatePatient(patient:any){
    return this.httpClient.put('/app/secured/updatePatient',patient,{headers : this.postaviHeadere()})
  }

  deletePatient(id:any){
    let params = new HttpParams();   
    params = params.append('id', id);

    return this.httpClient.delete('/app/secured/deletePatient',{params:params,headers:this.postaviHeadere()})
  }

  getDiseases(page:number){
    return this.httpClient.get('/app/secured/getDiseases/'+page,{headers : this.postaviHeadere()})
  }

  insertDisease(disease:any){
    return this.httpClient.post('/app/secured/insertDisease',disease,{headers : this.postaviHeadere()});
  }

  updateDisease(disease:any){
    return this.httpClient.put('/app/secured/updateDisease',disease,{headers : this.postaviHeadere()})
  }

  deleteDisease(id:any){
    let params = new HttpParams();   
    params = params.append('id', id);

    return this.httpClient.delete('/app/secured/deleteDisease',{params:params,headers:this.postaviHeadere()})
  }

  insertMedication(medication:any){
    return this.httpClient.post('/app/secured/insertAntibiotic',medication,{headers : this.postaviHeadere()});
  }

  updateMedication(medication:any){
    return this.httpClient.put('/app/secured/updateAntibiotic',medication,{headers : this.postaviHeadere()})
  }

  deleteMedication(id:any){
    let params = new HttpParams();   
    params = params.append('id', id);

    return this.httpClient.delete('/app/secured/deleteAntibiotic',{params:params,headers:this.postaviHeadere()})
  }

  getDiagnostics(page:number){
    return this.httpClient.get('/app/secured/getDiagnostics/'+page,{headers : this.postaviHeadere()})
  }

  updateDiagnostic(diagnostic:any){
    return this.httpClient.put('/app/secured/updateDiagnostic',diagnostic,{headers : this.postaviHeadere()})
  }

  deleteDiagnostic(id:any){
    let params = new HttpParams();   
    params = params.append('id', id);

    return this.httpClient.delete('/app/secured/deleteDiagnostic',{params:params,headers:this.postaviHeadere()})
  }

  postaviHeadere(){
    let headers = new HttpHeaders();
    headers = headers.set('token', localStorage.getItem('logovanKorisnik'));

    return headers;
  }
}
