import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public shown : boolean;

  constructor() { }

  ngOnInit(): void {
    this.shown = false;
  }

  public toggleSidebar() : void {
    console.log('Toggled', this.shown);
    this.shown = !this.shown;
  }

  public getFooter(){
    return `© COPYRIGHT ${new Date().getFullYear()}. TODOS LOS DERECHOS RESERVADOS.`; 
  }

}
