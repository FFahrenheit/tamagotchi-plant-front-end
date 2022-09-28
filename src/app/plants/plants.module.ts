import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlantsRoutes } from './plants.routing';
import { MyPlantsComponent } from './my-plants/my-plants.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MyPlantsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(PlantsRoutes)
  ]
})
export class PlantsModule { }
