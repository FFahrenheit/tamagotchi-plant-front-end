import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/shared/services/auth/token.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public shown : boolean;

  constructor(private token   : TokenService,
              private router  : Router,
              private toastr   : ToastrService) { }

  ngOnInit(): void {
    this.shown = false;
  }

  onTitleClick(){
    this.router.navigate(['/']);
  }

  onRegisterClick(){
    this.router.navigate(['/register'])
  }

  public toggleSidebar() : void {
    console.log('Toggled', this.shown);
    this.shown = !this.shown;
  }

  public getFooter(){
    return `© COPYRIGHT ${new Date().getFullYear()}. TODOS LOS DERECHOS RESERVADOS.`; 
  }

  public logout(){
    this.token.resetToken();
    this.router.navigate(['auth']);
    this.toastr.info('Sesión cerrada con éxito', '¡Hasta luego!')
  }
}
