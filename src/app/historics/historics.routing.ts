import { Route } from "@angular/router";
import { HistoricsMainComponent } from "./historics-main/historics-main.component";


export const HistoricsRoutes : Route[] = [
    {
        path: '',
        children: [
            {
                path: 'dashboard',
                component: HistoricsMainComponent,
                data: {
                    title: 'Mi mascota'
                }
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'dashboard'
            }
        ]
    }
];