import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlantsRoutes } from './plants.routing';
import { MyPlantsComponent } from './my-plants/my-plants.component';



@NgModule({
  declarations: [
    MyPlantsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PlantsRoutes)
  ]
})
export class PlantsModule { }
