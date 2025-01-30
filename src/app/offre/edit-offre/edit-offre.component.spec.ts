import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOffreComponent } from './edit-offre.component';

describe('EditOffreComponent', () => {
  let component: EditOffreComponent;
  let fixture: ComponentFixture<EditOffreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditOffreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditOffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
