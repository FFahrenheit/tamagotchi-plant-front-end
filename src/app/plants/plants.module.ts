import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlantsRoutes } from './plants.routing';
import { PlantSelectionViewComponent } from './plant-selection-view/plant-selection-view.component';
import { PlantCardComponent } from './plant-card/plant-card.component';



@NgModule({
  declarations: [
    PlantSelectionViewComponent,
    PlantCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PlantsRoutes)
  ]
})
export class PlantsModule { }
