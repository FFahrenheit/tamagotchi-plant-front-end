import { Route } from "@angular/router";
import { PlantSelectionViewComponent } from "./plant-selection-view/plant-selection-view.component";

export const PlantsRoutes : Route[] = [
    {
        path: '',
        children: [
            {
                path: 'dashboard',
                component: PlantSelectionViewComponent,
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