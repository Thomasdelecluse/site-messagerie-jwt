import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightContactComponent } from './right-contact.component';

describe('RightContactComponent', () => {
  let component: RightContactComponent;
  let fixture: ComponentFixture<RightContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RightContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
