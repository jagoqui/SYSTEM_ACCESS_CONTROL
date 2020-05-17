import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfIdReceptorComponent } from './rf-id-receptor.component';

describe('RfIdReceptorComponent', () => {
  let component: RfIdReceptorComponent;
  let fixture: ComponentFixture<RfIdReceptorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfIdReceptorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfIdReceptorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
