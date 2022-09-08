import { Route } from "@angular/router";


export const PlantsRoutes : Route[] = [
    {
        path: '',
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'pet'
            }
        ]
    }
];