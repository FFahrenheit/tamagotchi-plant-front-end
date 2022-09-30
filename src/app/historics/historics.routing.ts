import { Route } from "@angular/router";
import { ClusterChartComponent } from "./cluster-chart/cluster-chart.component";
import { HistoricsMainComponent } from "./historics-main/historics-main.component";


export const HistoricsRoutes : Route[] = [
    {
        path: '',
        children: [
            {
                path: 'bar',
                component: HistoricsMainComponent,
                data: {
                    title: 'Datos historicos'
                }
            },
            {
                path: 'clustering',
                component: ClusterChartComponent,
                data: {
                    title: 'Clusters de datos'
                }
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'bar'
            }
        ]
    }
];