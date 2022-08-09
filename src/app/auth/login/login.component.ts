import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form : FormGroup;

  constructor(private toastr  : ToastrService,
              private fb      : FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public async onSubmit() {
    if(this.form.valid){
      console.log('TODO: Call to service')
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

}
