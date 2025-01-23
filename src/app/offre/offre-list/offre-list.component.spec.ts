import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffreListComponent } from './offre-list.component';

describe('OffreListComponent', () => {
  let component: OffreListComponent;
  let fixture: ComponentFixture<OffreListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OffreListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
