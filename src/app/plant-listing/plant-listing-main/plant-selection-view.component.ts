import { Component, OnInit } from '@angular/core';
import { PlantService } from 'src/app/shared/services/plant/plant.service';

@Component({
  selector: 'app-plant-selection-view',
  templateUrl: './plant-selection-view.component.html',
  styleUrls: ['./plant-selection-view.component.scss']
})
export class PlantSelectionViewComponent implements OnInit {
  plants:Array<any> = [];

  constructor(plantSrv:PlantService) {
    plantSrv.getMyPlants().subscribe(data => this.plants = data)
   }

  ngOnInit(): void {
  }

}
