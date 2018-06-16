import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable()
export class LoginService {

  constructor(private httpClient : HttpClient) { }

  prijaviSe(user){
    return this.httpClient.post('/app/login', user);
  }

  odjaviSe(username){
    let params = new HttpParams();   
    params = params.append('username', username,);

    return this.httpClient.get('app/secured/logout',{params:params,headers:this.postaviHeadere()})
  }

  postaviHeadere(){
    let headers = new HttpHeaders();
    headers = headers.set('token', localStorage.getItem('logovanKorisnik'));

    return headers;
  }

}
