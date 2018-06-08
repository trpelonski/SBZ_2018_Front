import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginService {

  constructor(private httpClient : HttpClient) { }

  prijaviSe(user){
    return this.httpClient.post('/app/login', user);
  }

}
