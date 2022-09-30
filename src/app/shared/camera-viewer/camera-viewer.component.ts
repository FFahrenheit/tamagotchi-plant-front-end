import { Component, OnInit, Input } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { CameraViewerService } from '../services/sockets/camera-viewer.service';

@Component({
  selector: 'app-camera-viewer',
  templateUrl: './camera-viewer.component.html',
  styleUrls: ['./camera-viewer.component.scss']
})
export class CameraViewerComponent implements OnInit {

  @Input() public serverUrl : string;
  
  public videoSrc : SafeUrl;

  constructor(private cameraService : CameraViewerService,
              private toastr        : ToastrService) { }

  ngOnInit(): void {
    this.toastr.info('Conectando a servicio de cámara, espere por favor', 'Conectando...')
    this.cameraService.connect(this.serverUrl).then(resp => {
      this.toastr.clear();
      if(!resp){
        this.toastr.error('No se pudo conectar al servicio de cámara', 'Error');
        return;
      }
      this.toastr.success('Conectado con éxito', 'Viendo streaming');

      this.cameraService.streamVideo().subscribe(frame => {
        this.videoSrc = frame;
      });
    }, error=>{
      this.toastr.clear();
      this.toastr.error(error, 'Error');
    });
  }

}
