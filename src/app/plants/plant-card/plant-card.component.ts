import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-plant-card',
  templateUrl: './plant-card.component.html',
  styleUrls: ['./plant-card.component.scss']
})
export class PlantCardComponent implements OnInit {

  spinnerDiameter = window.innerHeight / 10;

  constructor() {
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.spinnerDiameter = window.innerHeight / 10;
  }

  ngOnInit(): void {
  }

}
