import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlantsRoutes } from './plants.routing';
import { PlantSelectionViewComponent } from './plant-listing-main/plant-selection-view.component';
import { PlantCardComponent } from './plant-card/plant-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    PlantSelectionViewComponent,
    PlantCardComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    RouterModule.forChild(PlantsRoutes)
  ],
  exports:[
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ]
})
export class PlantsModule { }
