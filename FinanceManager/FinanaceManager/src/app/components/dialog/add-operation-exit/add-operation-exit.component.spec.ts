import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOperationExitComponent } from './add-operation-exit.component';

describe('AddOperationExitComponent', () => {
  let component: AddOperationExitComponent;
  let fixture: ComponentFixture<AddOperationExitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOperationExitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOperationExitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
