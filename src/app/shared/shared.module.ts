import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderSpinnerComponent } from './loader-spinner/loader-spinner.component';



@NgModule({
  declarations: [
    LoaderSpinnerComponent
  ],
  exports: [
    LoaderSpinnerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
