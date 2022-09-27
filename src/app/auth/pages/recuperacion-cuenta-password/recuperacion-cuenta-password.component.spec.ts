import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperacionCuentaPasswordComponent } from './recuperacion-cuenta-password.component';

describe('RecuperacionCuentaPasswordComponent', () => {
  let component: RecuperacionCuentaPasswordComponent;
  let fixture: ComponentFixture<RecuperacionCuentaPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecuperacionCuentaPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperacionCuentaPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
