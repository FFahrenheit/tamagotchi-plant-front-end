import { Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-plants',
  templateUrl: './my-plants.component.html',
  // styleUrls: ['./my-plants.component.scss']
})
export class MyPlantsComponent implements OnInit {
  public log : any[] = [];
  public myId : string = '192.168.100.200';
  private ws : WebSocket; 
  public src : SafeUrl = '';

  constructor(
    // private plantsStatus : PlantStatusService
    // private camera : CameraViewerService,
    private toastr : ToastrService,
    ) { }

  ngOnInit(): void {
    // this.plantsStatus.listen('test').subscribe(data => {
    //   console.log(data);
    //   this.log.push(data);
    // });

    // this.plantsStatus.listen('hey').subscribe(data => {
    //   console.warn(data);
    // });
    
    // this.sendID();
  }

  public async sendHour(){
    // this.plantsStatus.emit('hour', new Date());
    console.log('Testing');
    await this.setWS();
  }

  public async sendID(){
    // this.plantsStatus.emit('id', this.myId);
    console.log('Testing the other ws');
    await this.setWS();
  }

  public async setWS(){
    try{
      let result = await this.camera.connect(this.myId);
      this.toastr.success('Success: ' + result);
    }catch(e : any){
      this.toastr.error(e);
    }

    this.camera.streamVideo().subscribe((src : SafeUrl) => {
      this.src  = src;
    })

    this.camera.getFaces().subscribe( (face : string) => {
      console.log('Face added ' + face);
    });
  }

}
