import { Route } from "@angular/router";
import { NotLoggedGuard } from "./guards/not-logged.guard";
import { BlankComponent } from "./layouts/blank/blank.component";

export const AppRoutes: Route[] = [
    {
        path: '',
        component: BlankComponent,
        children: [{
            path: 'auth',
            canActivate: [NotLoggedGuard],
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