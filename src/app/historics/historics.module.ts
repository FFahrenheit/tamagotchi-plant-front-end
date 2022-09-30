import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoricsMainComponent } from './historics-main/historics-main.component';
import { RouterModule } from '@angular/router';
import { HistoricsRoutes } from './historics.routing';
import { ClusterChartComponent } from './cluster-chart/cluster-chart.component';


@NgModule({
  declarations: [
    HistoricsMainComponent,
    ClusterChartComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(HistoricsRoutes)
  ]
})
export class HistoricsModule { }
