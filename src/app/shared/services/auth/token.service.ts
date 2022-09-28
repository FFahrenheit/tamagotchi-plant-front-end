import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private token : string = '';

  constructor() { 
    this.token = localStorage.getItem('token') || '';
  }

  public hasToken(){
    return this.token && this.token != '';
  }

  public setToken(token : string){
    this.token = token;
    localStorage.setItem("token", token);
  }

  public getToken() : string{
    return `Bearer ${this.token}`;
  }

  public resetToken(){
    this.setToken('');
  }
}
