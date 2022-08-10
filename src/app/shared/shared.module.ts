import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderSpinnerComponent } from './loader-spinner/loader-spinner.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';



@NgModule({
  declarations: [
    LoaderSpinnerComponent,
    ConfirmModalComponent
  ],
  exports: [
    LoaderSpinnerComponent,
    ConfirmModalComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
