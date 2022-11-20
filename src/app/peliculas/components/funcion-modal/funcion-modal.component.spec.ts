import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionModalComponent } from './funcion-modal.component';

describe('FuncionModalComponent', () => {
  let component: FuncionModalComponent;
  let fixture: ComponentFixture<FuncionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuncionModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
