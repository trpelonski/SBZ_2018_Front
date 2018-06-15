import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ReportService {

  constructor(private httpClient : HttpClient) { }

  getPotentialChronicDiseasePatients(){
    return this.httpClient.get('/app/secured/getPotentialChronicDiseasePatients',{headers : this.postaviHeadere()});
  }

  getPotentialAddicts(){
    return this.httpClient.get('/app/secured/getPotentialAddicts',{headers : this.postaviHeadere()});
  }

  getPotentialWeakImmunityPatients(){
    return this.httpClient.get('/app/secured/getPotentialWeakImmunityPatients',{headers : this.postaviHeadere()});
  }

  postaviHeadere(){
    let headers = new HttpHeaders();
    headers = headers.set('token', localStorage.getItem('logovanKorisnik'));

    return headers;
  }
}
