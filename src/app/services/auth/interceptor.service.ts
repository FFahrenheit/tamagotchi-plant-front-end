import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, from, lastValueFrom, Observable, throwError } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {
  private retryCount = 0;

  constructor(private tokenService  : TokenService) {}

  async handle(req : HttpRequest<any>, next : HttpHandler) {
    if(!this.tokenService.hasToken()){
      console.error('TODO: Request new token?');
    }

    const tokenizedRequest = req.clone({
      setHeaders: {
        Authorization: this.tokenService.getToken()
      }
    });

    return lastValueFrom(
      next.handle(tokenizedRequest).pipe(
        catchError((error:any) => {
          console.warn(error);
          if(error){
            this.retryCount += 1;
            console.log(`Error: ${this.retryCount} retries`);
          }
          
          if(this.retryCount >= 5){
            this.tokenService.resetToken();
          }

          return throwError( () => new Error("Error: No se pudo autorizar con el servidor"));
        })
      )
    )
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>>{
    return from(this.handle(req, next));
  }
}
