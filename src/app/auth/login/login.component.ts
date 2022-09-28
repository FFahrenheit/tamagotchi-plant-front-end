import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/shared/services/auth/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form : FormGroup;

  constructor(private toastr  : ToastrService,
              private fb      : FormBuilder,
              private login   : LoginService,
              private router  : Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public async onSubmit() {
    if(this.form.valid){
      try{
        await this.login.makeLogin(this.form.value);
        this.toastr.success("Sesión iniciada", "Éxito");
        this.router.navigate(['plants']);
      }catch(e : any){
        this.toastr.error(e, "Error");
        this.form.controls['password'].setValue('');
      }
    }else{
      this.form.markAllAsTouched();
      this.toastr.error('Por favor, rellene el formulario', 'Datos incompletos');
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
    return control.valid ? 'is-valid' : 'is-invalid';
  }

  confirm(){
    console.log('Umhh');
  }
}
