import { Route } from "@angular/router";
import { PlantRegisterMainComponent } from "./plant-register-main/plant-register-main.component";


export const RegisterRoutes : Route[] = [
    {
        path: '',
        children: [
            {
                path: 'dashboard',
                component: PlantRegisterMainComponent,
                data: {
                    title: 'Registrar planta'
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