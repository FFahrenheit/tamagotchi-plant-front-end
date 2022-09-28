import { Component, HostListener, OnInit } from '@angular/core';
import { PlantService } from 'src/app/shared/services/plant/plant.service';

@Component({
  selector: 'app-pet-monitor-main',
  templateUrl: './pet-monitor-main.component.html',
  styleUrls: ['./pet-monitor-main.component.scss']
})
export class PetMonitorMainComponent implements OnInit {

  temperatura = 0;
  luminosidad = 0;
  humedad_tierra = 0;
  humedad_ambiente = 0;

  spinnerDiameter = window.innerHeight / 10;

  plantData:any = {};

  constructor(private plantSrv:PlantService) { 
    
  }

  ngOnInit(): void {
    this.plantSrv.getMyPlants().subscribe(data => {
      this.plantData=data[0];
      let plantData = this.plantData;
      let rec = this.plantData.last_rec;

      console.log(data)
  
      if (this.plantData) {
        this.temperatura = (rec.temperatura-plantData.min_temp) * 100 / (plantData.max_temp - plantData.min_temp);
        this.luminosidad = (rec.luminosidad-plantData.min_lum) * 100 / (plantData.max_lum - plantData.min_lum);
        this.humedad_tierra = (rec.humedad_tierra-plantData.min_humt) * 100 / (plantData.max_humt - plantData.min_humt);
        this.humedad_ambiente = (rec.humedad_ambiente-plantData.min_hum) * 100 / (plantData.max_hum - plantData.min_hum);
      }
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.spinnerDiameter = window.innerHeight / 10;
  }

}
