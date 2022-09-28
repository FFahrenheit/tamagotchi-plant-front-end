import { Route } from "@angular/router";
import { PetMonitorMainComponent } from "./pet-monitor-main/pet-monitor-main.component";


export const PetRoutes : Route[] = [
    {
        path: '',
        children: [
            {
                path: 'dashboard',
                component: PetMonitorMainComponent,
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