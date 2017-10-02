import { SaveVehicle } from './../models/vehicle';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class VehicleService {
  private readonly vehiclesEndpoint = '/api/vehicles';

  constructor(private http: Http) { }

  getVehicles(filter: any) {
    return this.http.get(this.vehiclesEndpoint + '?' + this.toQueryString(filter))
        .map(res => res.json());
  }
  toQueryString(obj: any) {
    //prop=value&
    var parts = [];
    for (var property in obj) {
      var value = obj[property];
      if(value != null && value != undefined) {
        parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value))
      }
    } 
    return parts.join('&');
  }
  getFeatures() {
    return this.http.get('/api/features').map(res => res.json());
  }

  getMakes() {
      return this.http.get('/api/makes').map(res => res.json());
  }
  create(vehicle: any) {
    return this.http.post('/api/vehicles', vehicle).map(res => res.json());
  }
  getVehicle(id: number) {
      return this.http.get('/api/vehicles/' + id).map(res => res.json());
  }
  update(vehicle: SaveVehicle) {
    return this.http.put('/api/vehicles/'+ vehicle.id,vehicle).map(res => res.json());
  }
  delete(id: number) {
    return this.http.delete('/api/vehicles/' + id).map(res => res.json());
  }
}
