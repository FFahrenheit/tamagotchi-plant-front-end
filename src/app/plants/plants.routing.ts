import { Route } from "@angular/router";
import { MyPlantsComponent } from "./my-plants/my-plants.component";

export const PlantsRoutes : Route[] = [
    {
        path: '',
        children: [
            {
                path: 'dashboard',
                component: MyPlantsComponent,
                data: {
                    title: 'Mis plantas'
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