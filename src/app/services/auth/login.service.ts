import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { LoginRequest } from 'src/models/requests/auth.requests.interface';
import { LoginResponse } from 'src/models/responses/auth.responses.interface';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http  : HttpClient,
              private token : TokenService) { }

  private login(
    credentials : LoginRequest
  ) : Promise<LoginResponse>{
      return new Promise( async(resolve, reject) => {
        try{
          const request = this.http.post<LoginResponse>(
            "/api/auth", credentials
          );
          const data = await lastValueFrom(request);
          resolve(data);
        }catch(e){
          reject(e);
        }
      });
  }

  public async makeLogin(
    credentials : LoginRequest
  ) : Promise<boolean>{
    return new Promise( async(resolve, reject) => {
      try{
        const response = await this.login(credentials);
        this.token.setToken(response.token);
        resolve(true);
      }catch(e : any){
        const message = e.error['msg'] || "Server error";
        reject(message);
      }
    });
  }
}
