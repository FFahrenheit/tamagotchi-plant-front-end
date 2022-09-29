import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricsMainComponent } from './historics-main.component';

describe('HistoricsMainComponent', () => {
  let component: HistoricsMainComponent;
  let fixture: ComponentFixture<HistoricsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricsMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
