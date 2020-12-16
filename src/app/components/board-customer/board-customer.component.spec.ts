import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardCustomerComponent } from './board-customer.component';

describe('BoardCustomerComponent', () => {
  let component: BoardCustomerComponent;
  let fixture: ComponentFixture<BoardCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
