import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plant-selection-view',
  templateUrl: './plant-selection-view.component.html',
  styleUrls: ['./plant-selection-view.component.scss']
})
export class PlantSelectionViewComponent implements OnInit {

  plants = [1, 2, 3];

  constructor() { }

  ngOnInit(): void {
  }

}
