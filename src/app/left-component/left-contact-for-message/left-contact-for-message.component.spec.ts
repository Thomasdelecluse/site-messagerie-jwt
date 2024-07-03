import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftContactForMessageComponent } from './left-contact-for-message.component';

describe('LeftContactComponent', () => {
  let component: LeftContactForMessageComponent;
  let fixture: ComponentFixture<LeftContactForMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftContactForMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeftContactForMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
