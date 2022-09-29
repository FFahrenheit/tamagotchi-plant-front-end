import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  private serviceUrl = '/api/planta';

  constructor(private http: HttpClient) { }

  getMyPlants():Observable<any>{
    var headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"));
    return this.http.get<any>(this.serviceUrl + '/mine', { headers: headers });
  }

  getPlantById(id:number):Observable<any>{
    var headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"));
    return this.http.get<any>(this.serviceUrl + '/' + id, { headers: headers });
  }

  getHistorics(id:number):Observable<any>{
    var headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"));
    return this.http.get<any>('api/historico/' + id, { headers: headers });
  }

  putConfigs(data:any, id:number):Observable<any>{
    var headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"));
    return this.http.put<any>('api/planta/settings/' + id, data, { headers: headers });
  }
}
