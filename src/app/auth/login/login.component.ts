import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form : FormGroup;

  constructor(private toastr  : ToastrService,
              private fb      : FormBuilder,
              private login   : LoginService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public async onSubmit() {
    if(this.form.valid){
      const data = await this.login.login("","");

      console.log(data);
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
