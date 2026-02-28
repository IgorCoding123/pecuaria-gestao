import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducaoListComponent } from './producao-list.component';

describe('ProducaoListComponent', () => {
  let component: ProducaoListComponent;
  let fixture: ComponentFixture<ProducaoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProducaoListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProducaoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
