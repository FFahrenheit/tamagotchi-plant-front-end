import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { RegisterRequest } from 'src/models/requests/auth.requests.interface';
import { RegisterResponse } from 'src/models/responses/auth.responses.interface';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http  : HttpClient) { }

  private register(
    userData : RegisterRequest
  ): Promise<RegisterResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const request = this.http.post<RegisterResponse>(
          "/api/usuario", userData
        );
        const data = await lastValueFrom(request);
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  }

  public makeRegister(
    userData : RegisterRequest
  ) : Promise<boolean>{
    return new Promise( async(resolve, reject) => {
      try{
        const response = await this.register(userData);
        resolve(response.acknowledged);
      }catch(e : any){
        const message = e.error['msg'] || "Server error";
        reject(message);
      }
    });
  }
}
