import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { AuthRoutes } from './auth.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { RecoverComponent } from './recover/recover.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    RecoverComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AuthRoutes),
    ReactiveFormsModule
  ]
})
export class AuthModule { }
