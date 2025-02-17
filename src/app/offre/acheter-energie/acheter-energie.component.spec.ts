import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcheterEnergieComponent } from './acheter-energie.component';

describe('AcheterEnergieComponent', () => {
  let component: AcheterEnergieComponent;
  let fixture: ComponentFixture<AcheterEnergieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcheterEnergieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcheterEnergieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
