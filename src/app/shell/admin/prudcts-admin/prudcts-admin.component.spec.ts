import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrudctsAdminComponent } from './prudcts-admin.component';

describe('PrudctsAdminComponent', () => {
  let component: PrudctsAdminComponent;
  let fixture: ComponentFixture<PrudctsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrudctsAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrudctsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
