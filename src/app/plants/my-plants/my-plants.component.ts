import { Component, OnInit } from '@angular/core';
import { PlantStatusService } from 'src/app/services/sockets/plant-status.service';

@Component({
  selector: 'app-my-plants',
  templateUrl: './my-plants.component.html',
  styleUrls: ['./my-plants.component.scss']
})
export class MyPlantsComponent implements OnInit {
  public log : any[] = [];

  constructor(private plantsStatus : PlantStatusService) { }

  ngOnInit(): void {
    this.plantsStatus.listen('test').subscribe(data => {
      console.log(data);
      this.log.push(data);
    });
  }

  public sendHour(){
    this.plantsStatus.emit('hour', new Date());
  }

}
