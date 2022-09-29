import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoricsMainComponent } from './historics-main/historics-main.component';
import { RouterModule } from '@angular/router';
import { HistoricsRoutes } from './historics.routing';


@NgModule({
  declarations: [
    HistoricsMainComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(HistoricsRoutes)
  ]
})
export class HistoricsModule { }
