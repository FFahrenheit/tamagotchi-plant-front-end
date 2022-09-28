import { Route } from "@angular/router";
import { LoggedGuard } from "./guards/logged.guard";
import { NotLoggedGuard } from "./guards/not-logged.guard";
import { BlankComponent } from "./layouts/blank/blank.component";
import { DashboardComponent } from "./layouts/dashboard/dashboard.component";

export const AppRoutes: Route[] = [
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
    },
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
                path: '',
                pathMatch: 'full',
                redirectTo: 'plants'
            }
        ]
    }
];