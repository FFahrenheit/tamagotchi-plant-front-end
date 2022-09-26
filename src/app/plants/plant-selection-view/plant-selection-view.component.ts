import { Component, OnInit } from '@angular/core';
import { PlantService } from 'src/app/services/auth/plant.service';

@Component({
  selector: 'app-plant-selection-view',
  templateUrl: './plant-selection-view.component.html',
  styleUrls: ['./plant-selection-view.component.scss']
})
export class PlantSelectionViewComponent implements OnInit {

  plants = [1, 2, 3];

  constructor(plantSrv:PlantService) {
    plantSrv.getMyPlants().subscribe(data => console.log(data));
   }

  ngOnInit(): void {
  }

}
