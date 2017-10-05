import { AuthHttp } from 'angular2-jwt';
import { SaveVehicle } from './../models/vehicle';
import { Http, RequestOptions,Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class VehicleService {
  private readonly vehiclesEndpoint = '/api/vehicles';

  constructor(private http: Http, private authHtpp: AuthHttp) { }

      // get headers() {
      //   var superHeaders= new  Headers({'Content-Type': 'application/json'});
      //     // Set the default 'Content-Type' header
      //     const token = localStorage.getItem('id_token');
      //     if(token) {
      //       superHeaders.append('Authorization','Bearer '+ token)
      //       var options = new RequestOptions({headers: superHeaders});

      //       return options;
      //     } 
      //     return new RequestOptions({});
      // }
  
      
  getVehicles(filter: any) {
    return this.authHtpp.get(this.vehiclesEndpoint + '?' + this.toQueryString(filter))
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
    return this.authHtpp.get('/api/features').map(res => res.json());
  }

  getMakes() {
      return this.authHtpp.get('/api/makes').map(res => res.json());
  }
  create(vehicle: any) {
    return this.authHtpp.post('/api/vehicles', vehicle).map(res => res.json());
  }
  getVehicle(id: number) {
      return this.authHtpp.get('/api/vehicles/' + id).map(res => res.json());
  }
  update(vehicle: SaveVehicle) {
    return this.authHtpp.put('/api/vehicles/'+ vehicle.id,vehicle).map(res => res.json());
  }
  delete(id: number) {
    return this.authHtpp.delete('/api/vehicles/' + id).map(res => res.json());
  }
}
