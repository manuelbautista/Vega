import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class VehicleService {

  constructor(private http: Http) { }

  getFeatures() {
    return this.http.get('/api/features').map(res => res.json());
  }

  getMakes() {
      return this.http.get('/api/makes').map(res => res.json());
  }
}
