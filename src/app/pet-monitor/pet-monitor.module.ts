import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetMonitorMainComponent } from './pet-monitor-main/pet-monitor-main.component';
import { RouterModule } from '@angular/router';
import { PetRoutes } from './pet-monitor.routing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    PetMonitorMainComponent,
    SettingsDialogComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatDialogModule,
    FormsModule, ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule.forChild(PetRoutes),
    SharedModule
  ],
  exports: [
    MatProgressSpinnerModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class PetMonitorModule { }
