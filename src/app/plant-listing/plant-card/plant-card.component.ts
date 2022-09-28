import { Component, HostListener, Input, OnInit } from '@angular/core';

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

  constructor() {

  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.spinnerDiameter = window.innerHeight / 10;
  }

  ngOnInit(): void {
    console.log(this.plantData);
    if (this.plantData) {
      this.temperatura = this.plantData.last_rec.temperatura;
      this.luminosidad = this.plantData.last_rec.luminosidad;
      this.humedad_tierra = this.plantData.last_rec.humedad_tierra;
      this.humedad_ambiente = this.plantData.last_rec.humedad_ambiente;
    }
  }

}
