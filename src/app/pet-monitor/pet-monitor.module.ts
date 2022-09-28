import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetMonitorMainComponent } from './pet-monitor-main/pet-monitor-main.component';
import { RouterModule } from '@angular/router';
import { PetRoutes } from './pet-monitor.routing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon'



@NgModule({
  declarations: [
    PetMonitorMainComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    RouterModule.forChild(PetRoutes)
  ],
  exports: [
    MatProgressSpinnerModule,
    MatIconModule
  ]
})
export class PetMonitorModule { }
