import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailOperationComponent } from './detail-operation.component';

describe('DetailOperationComponent', () => {
  let component: DetailOperationComponent;
  let fixture: ComponentFixture<DetailOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailOperationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
