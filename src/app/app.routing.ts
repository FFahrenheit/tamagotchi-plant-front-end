import { Route } from "@angular/router";
import { LoggedGuard } from "./guards/logged.guard";
import { NotLoggedGuard } from "./guards/not-logged.guard";
import { BlankComponent } from "./layouts/blank/blank.component";
import { DashboardComponent } from "./layouts/dashboard/dashboard.component";

export const AppRoutes: Route[] = [
    {
        path: '',
        component: DashboardComponent,
        canActivate: [LoggedGuard],
        children: [
            {
                path: 'plants',
                loadChildren: () =>
                    import('./plant-listing/plants.module').then(
                        m => m.PlantsModule
                    )
            },
            {
                path: 'pet',
                loadChildren: () =>
                    import('./pet-monitor/pet-monitor.module').then(
                        m => m.PetMonitorModule
                    )
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'plants'
            }
        ]
    },
    {
        path: '',
        component: BlankComponent,
        canActivate: [NotLoggedGuard],
        children: [
            {
                path: 'auth',
                loadChildren: () =>
                    import('./auth/auth.module').then(
                        m => m.AuthModule
                    )
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'auth' //Change to dashboard
            }]
    }
    
];