import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftContactComponent } from './left-contact.component';

describe('LeftContactComponent', () => {
  let component: LeftContactComponent;
  let fixture: ComponentFixture<LeftContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeftContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
