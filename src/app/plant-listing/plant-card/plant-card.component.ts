import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plant-card',
  templateUrl: './plant-card.component.html',
  styleUrls: ['./plant-card.component.scss']
})
export class PlantCardComponent implements OnInit {

  @Input() plantData:any;
  temperatura = 0;
  luminosidad = 0;
  humedad_tierra = 0;
  humedad_ambiente = 0;

  spinnerDiameter = window.innerHeight / 10;

  constructor(private router:Router) {

  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.spinnerDiameter = window.innerHeight / 10;
  }

  ngOnInit(): void {
    let plantData = this.plantData;
    let rec = this.plantData.last_rec;

    if (this.plantData) {
      this.temperatura = (rec.temperatura-plantData.min_temp) * 100 / (plantData.max_temp - plantData.min_temp);
      this.luminosidad = (rec.luminosidad-plantData.min_lum) * 100 / (plantData.max_lum - plantData.min_lum);
      this.humedad_tierra = (rec.humedad_tierra-plantData.min_humt) * 100 / (plantData.max_humt - plantData.min_humt);
      this.humedad_ambiente = (rec.humedad_ambiente-plantData.min_hum) * 100 / (plantData.max_hum - plantData.min_hum);
    }
  }

  onSelectClick(){
    this.router.navigate(['/pet'])
  }

}
