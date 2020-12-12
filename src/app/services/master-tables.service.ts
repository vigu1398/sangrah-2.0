import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MasterTablesService {

  constructor(private http: HttpClient,
    @Inject('apiurl') private ApiUrl) { }

  getMasterGeoList() {
    return this.http.get('/api/master/geo');
  }

  getMasterFunctionalList() {
    return this.http.get('/api/master/functional');
  }

  getGeoRecord(id: any) {
    return this.http.get('/api/master/geo/' + id);
  }

  getFunctionalRecord(id: any) {
    return this.http.get('/api/master/functional/' + id);
  }

  updateMasterFunctional(list: any) {
    return this.http.post('/api/master/functional/update', list);
  }

  updateMasterGeo(list: any) {
    return this.http.post('/api/master/geo/update', list);
  }

  getGeoHierarchy() {
    return this.http.get('/api/master/hierarchy/geo');
  }

  getHierarchy() {
    return this.http.get('/api/master/hierarchy');
  }

  getFunctionalHierarchy() {
    return this.http.get('/api/master/hierarchy/functional');
  }

  updateGeoHierarchy(list: any) {
    return this.http.post('/api/master/hierarchy/update', list);
  }

  updateFunctionalHierarchy(list: any) {
    return this.http.post('/api/master/functional/update', list);
  }

}