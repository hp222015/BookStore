import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPswdComponent } from './forgot-pswd.component';

describe('ForgotPswdComponent', () => {
  let component: ForgotPswdComponent;
  let fixture: ComponentFixture<ForgotPswdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotPswdComponent]
    });
    fixture = TestBed.createComponent(ForgotPswdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
