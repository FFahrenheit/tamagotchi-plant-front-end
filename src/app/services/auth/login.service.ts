import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http  : HttpClient) { }

  public login(
    username : string,
    password : string) : Promise<any>{
      return new Promise( async(resolve, reject) => {
        try{
          const request = this.http.put<any>(
            "/api/status/1", {}
          );

          const data = await lastValueFrom(request);

          resolve(data);
        }catch(e){
          reject(e);
        }
      });
  }
}
