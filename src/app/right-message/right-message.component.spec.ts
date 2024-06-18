import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightMessageComponent } from './right-message.component';

describe('RightMessageComponent', () => {
  let component: RightMessageComponent;
  let fixture: ComponentFixture<RightMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RightMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
