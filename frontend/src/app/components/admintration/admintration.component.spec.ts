import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmintrationComponent } from './admintration.component';

describe('AdmintrationComponent', () => {
  let component: AdmintrationComponent;
  let fixture: ComponentFixture<AdmintrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmintrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmintrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
