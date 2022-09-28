import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CameraViewerService {

  private ws: WebSocket;
  private WS_URL: string;

  private streamVideoSubject: Subject<SafeUrl>;
  private addFaceSubject : Subject<string>;

  constructor(private sanitizer: DomSanitizer) {
  }

  public connect(url: string, port: number = 82): Promise<boolean> {

    this.WS_URL = `ws://${url}:${port}`;

    return new Promise(async (resolve, reject) => {
      try {
        this.ws = new WebSocket(this.WS_URL);
        this.ws.onopen = () => {
          console.log('Connected to ' + this.WS_URL);
          this.ws.send('stream');
          this.listenToEveything();
          resolve(true);
        }
        this.ws.onerror = (e) => {
          console.log(e);
          reject('No se pudo conectar a la cámara');
        }
      } catch (e) {
        reject('No fue posible realizar la conexión');
      }
    });
  }

  public streamVideo(): Observable<SafeUrl> {
    let observer = new Observable<SafeUrl>();
    observer = this.streamVideoSubject.asObservable();
    return observer;
  }

  public getFaces() : Observable<string>{
    let observer = new Observable<string>();
    observer = this.addFaceSubject.asObservable();
    return observer;
  }

  private listenToEveything() {
    this.streamVideoSubject = new Subject<SafeUrl>();
    this.addFaceSubject = new Subject<string>();

    this.ws.onmessage = (message) => {
      if (message.data instanceof Blob) {
        const urlObject = URL.createObjectURL(message.data);
        const sanitizedUrl = this.sanitizer.bypassSecurityTrustUrl(urlObject);
        this.streamVideoSubject.next(sanitizedUrl);
        return;
      }

      if(typeof message.data !== 'string'){
        console.log('Undefined message');
        console.warn(message);
        return;
      }

      if(message.data.substring(0, 8) == 'listface'){
        this.addFaceSubject.next(message.data.substring(9));
        return;
      }

      
    }
  }
}
