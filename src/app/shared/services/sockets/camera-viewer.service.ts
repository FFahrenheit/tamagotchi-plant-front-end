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
  private deleteAllFacesSubject : Subject<void>;
  private faceDetectedSubject : Subject<void>;
  private currentStatusSubject : Subject<string>;

  constructor(private sanitizer: DomSanitizer) {
  }

  public connect(url: string, port: number = 82): Promise<boolean> {

    this.WS_URL = `ws://${url}:${port}`;
    // Probar el stream 

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
    return this.streamVideoSubject.asObservable();
  }

  public getFaces() : Observable<string>{
    return this.addFaceSubject.asObservable();
  }

  public receiveDeleteAllFaces() : Observable<void>{
    return this.deleteAllFacesSubject.asObservable();
  }

  public getDetectedFaces() : Observable<void>{
    return this.faceDetectedSubject.asObservable();
  }

  public getStatusUpdates() : Observable<string>{
    return this.currentStatusSubject.asObservable();
  }

  private listenToEveything() {
    this.streamVideoSubject = new Subject<SafeUrl>();
    this.addFaceSubject = new Subject<string>();
    this.deleteAllFacesSubject = new Subject<void>();
    this.faceDetectedSubject = new Subject<void>();
    this.currentStatusSubject = new Subject<string>();

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

      if(message.data == 'delete_faces'){
        this.deleteAllFacesSubject.next();
        return;
      }

      if(message.data == 'door_open'){
        this.faceDetectedSubject.next();
        return;
      }

      this.currentStatusSubject.next(message.data);
    }
  }

  public setStream(){
    this.ws.send('stream');
  }

  public setDetectionMode(){
    this.ws.send('detect');
  }

  public setRecognitionMode(){
    this.ws.send('recognise');
  }

  public setRecognitionFor(person : string){
    this.ws.send('capture:' + person);
  }

  public deleteAllFaces(){
    this.ws.send('delete_all');
  }

  public deletePerson(person : string){
    this.ws.send('remove:' + person);
  }
}
