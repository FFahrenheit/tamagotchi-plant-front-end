import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from 'src/app/shared/services/auth/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public form : FormGroup;

  constructor(private toastr    : ToastrService,
              private fb        : FormBuilder,
              private register  : RegisterService,
              private router    : Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      nombre: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      confirmPassword: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])]
    });
  }

  public passwordsMatch(){
    return this.get('password').value == this.get('confirmPassword').value;
  }

  public async onSubmit() {
    if(this.form.valid && this.passwordsMatch()){
      try{
        const response = await this.register.makeRegister(this.form.value);
        if(response){
          this.toastr.success("Usuario creado. Ahora puede iniciar sesión", "Éxito");
          this.form.reset();
          setTimeout(() => {
            this.router.navigate(['auth', 'login']);
          }, 3000);
        }else{
          console.error('Algo anda mal...');
        }
      }catch(e : any){
        this.toastr.error(e, "Error");
      }
    }else{
      this.form.markAllAsTouched();
      this.toastr.error('Por favor, rellene el formulario de forma válida', 'Datos incompletos');
    }
  }

  public get(ctrl : string){
    return this.form.controls[ctrl];
  }

  public getClass(ctrl : string){
    const control = this.get(ctrl);
    if(control.untouched){
      return '';
    }
    if(ctrl == 'confirmPassword' && !this.passwordsMatch()){
      return 'is-invalid';
    }
    return control.valid ? 'is-valid' : 'is-invalid';
  }

}
