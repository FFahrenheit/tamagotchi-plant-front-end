import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetMonitorMainComponent } from './pet-monitor-main/pet-monitor-main.component';
import { RouterModule } from '@angular/router';
import { PetRoutes } from './pet-monitor.routing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    PetMonitorMainComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    RouterModule.forChild(PetRoutes)
  ],
  exports: [
    MatProgressSpinnerModule
  ]
})
export class PetMonitorModule { }
