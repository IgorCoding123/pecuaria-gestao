import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaudeFormComponent } from './saude-form.component';

describe('SaudeFormComponent', () => {
  let component: SaudeFormComponent;
  let fixture: ComponentFixture<SaudeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaudeFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaudeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
