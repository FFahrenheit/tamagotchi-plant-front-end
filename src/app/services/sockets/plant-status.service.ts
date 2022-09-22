import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class PlantStatusService {
  socket : any;
  readonly uri : string = 'http://localhost:4000'

  constructor() { 
    this.socket = io(this.uri, { transports : ['websocket'] });
  }

  listen(eventName : string){
    return new Observable( subscriber => {
      this.socket.on(eventName, (data : any) => {
        subscriber.next(data);
      });
    });
  }

  emit(eventName : string, data : any){
    this.socket.emit(eventName, data);
  }
}
