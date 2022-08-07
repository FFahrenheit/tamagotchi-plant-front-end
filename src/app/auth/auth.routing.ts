import { Route } from "@angular/router";
import { LoginComponent } from "./login/login.component";

export const AuthRoutes: Route[] = [
    {
        path: '',
        children: [
            {
                path: 'login',
                component: LoginComponent,
                data: {
                    title: 'Iniciar sesión'
                }
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'login'
            }
        ]
    }
]