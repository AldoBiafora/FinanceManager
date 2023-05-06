import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategoryEntryComponent } from './add-category-entry.component';

describe('AddCategoryEntryComponent', () => {
  let component: AddCategoryEntryComponent;
  let fixture: ComponentFixture<AddCategoryEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCategoryEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCategoryEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
