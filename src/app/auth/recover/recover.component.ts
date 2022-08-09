import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss']
})
export class RecoverComponent implements OnInit {

  public form : FormGroup;

  constructor(private toastr  : ToastrService,
              private fb      : FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });
  }

  public async onSubmit() {
    if(this.form.valid){
      console.log('TODO: Call to service')
    }else{
      this.form.markAllAsTouched();
      this.toastr.error('Por favor, escriba un correo válido para recuperar su contraseña', 'Correo requerido');
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
