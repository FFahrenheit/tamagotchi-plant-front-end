import { Route } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

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
                path: 'sign-up',
                component: RegisterComponent,
                data: {
                    title: 'Crear cuenta'
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