import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderSpinnerComponent } from './loader-spinner/loader-spinner.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { CameraViewerComponent } from './camera-viewer/camera-viewer.component';



@NgModule({
  declarations: [
    LoaderSpinnerComponent,
    ConfirmModalComponent,
    CameraViewerComponent
  ],
  exports: [
    LoaderSpinnerComponent,
    ConfirmModalComponent,
    CameraViewerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
