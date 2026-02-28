import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducaoFormComponent } from './producao-form.component';

describe('ProducaoFormComponent', () => {
  let component: ProducaoFormComponent;
  let fixture: ComponentFixture<ProducaoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProducaoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProducaoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
