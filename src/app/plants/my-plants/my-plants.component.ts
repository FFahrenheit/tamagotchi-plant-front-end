import { Component, OnInit } from '@angular/core';
import { PlantStatusService } from 'src/app/services/sockets/plant-status.service';

@Component({
  selector: 'app-my-plants',
  templateUrl: './my-plants.component.html',
  styleUrls: ['./my-plants.component.scss']
})
export class MyPlantsComponent implements OnInit {
  public log : any[] = [];
  public myId : string = '1';

  constructor(private plantsStatus : PlantStatusService) { }

  ngOnInit(): void {
    this.plantsStatus.listen('test').subscribe(data => {
      console.log(data);
      this.log.push(data);
    });

    this.plantsStatus.listen('hey').subscribe(data => {
      console.warn(data);
    });
    
    this.sendID();
  }

  public sendHour(){
    this.plantsStatus.emit('hour', new Date());
  }

  public sendID(){
    this.plantsStatus.emit('id', this.myId);
  }

}
