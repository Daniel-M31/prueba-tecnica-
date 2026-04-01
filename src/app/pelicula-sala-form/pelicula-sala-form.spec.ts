import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeliculaSalaForm } from './pelicula-sala-form';

describe('PeliculaSalaForm', () => {
  let component: PeliculaSalaForm;
  let fixture: ComponentFixture<PeliculaSalaForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeliculaSalaForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeliculaSalaForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
