import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AppLoadService {
 
  constructor(private httpClient: HttpClient) { }
 
  initializeApp(): Promise<any> {
    return new Promise((resolve, reject) => {
        localStorage.removeItem('logovanKorisnik');
        resolve();
    });
  }
 
}