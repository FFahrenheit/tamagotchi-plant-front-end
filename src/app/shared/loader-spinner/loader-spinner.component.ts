import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-loader-spinner',
  templateUrl: './loader-spinner.component.html',
  styleUrls: ['./loader-spinner.component.scss']
})
export class LoaderSpinnerComponent implements OnDestroy {

  public isSpinnerVisible = true;

  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.router.events.subscribe({
      next: event => {
        if(event instanceof NavigationStart){
          this.isSpinnerVisible = true;
        }else if(event instanceof NavigationEnd ||
          event instanceof NavigationCancel || 
          event instanceof NavigationEnd){
            this.isSpinnerVisible = true;
        }
      },
      error: () => this.isSpinnerVisible = false
    })
  }

  ngOnDestroy(): void {
    this.isSpinnerVisible = false;
  }

}
