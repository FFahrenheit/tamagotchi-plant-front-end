import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderSpinnerComponent } from './loader-spinner/loader-spinner.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { CameraViewerComponent } from './camera-viewer/camera-viewer.component';
import { TooltipDirective } from '../directives/tooltip.directive';



@NgModule({
  declarations: [
    LoaderSpinnerComponent,
    ConfirmModalComponent,
    CameraViewerComponent,
    TooltipDirective
  ],
  exports: [
    LoaderSpinnerComponent,
    ConfirmModalComponent,
    CameraViewerComponent,
    TooltipDirective
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
