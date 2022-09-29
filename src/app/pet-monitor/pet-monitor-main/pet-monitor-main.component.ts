import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlantService } from 'src/app/shared/services/plant/plant.service';
import { PlantStatusService } from 'src/app/shared/services/sockets/plant-status.service';

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

  plantData: any = {};
  wsData: any = {};

  constructor(private plantSrv: PlantService, private plantaWs: PlantStatusService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
        this.plantaWs.emit("id", params['id_micro']);
        this.plantSrv.getPlantById(params['id_micro']).subscribe(data => {
          console.log(data)
          this.plantData = data; 
          this.plantaWs.listen("plantUpdate").subscribe(data => {

            this.wsData = data;
            console.log()
            let rec = this.wsData.payload.last_rec;

            console.log(rec)

            if (this.plantData) {
              this.temperatura = (rec.temperatura - this.plantData.min_temp) * 100 / (this.plantData.max_temp - this.plantData.min_temp);
              this.luminosidad = (rec.luminosidad - this.plantData.min_lum) * 100 / (this.plantData.max_lum - this.plantData.min_lum);
              this.humedad_tierra = (rec.humedad_tierra - this.plantData.min_humt) * 100 / (this.plantData.max_humt - this.plantData.min_humt);
              this.humedad_ambiente = (rec.humedad_ambiente - this.plantData.min_hum) * 100 / (this.plantData.max_hum - this.plantData.min_hum);
            }
          })
        })
      })

      }

  @HostListener('window:resize', ['$event'])
    onResize() {
      this.spinnerDiameter = window.innerHeight / 10;
    }

  }
