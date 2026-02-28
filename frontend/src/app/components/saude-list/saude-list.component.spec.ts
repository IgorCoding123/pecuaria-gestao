import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaudeListComponent } from './saude-list.component';

describe('SaudeListComponent', () => {
  let component: SaudeListComponent;
  let fixture: ComponentFixture<SaudeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaudeListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaudeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
