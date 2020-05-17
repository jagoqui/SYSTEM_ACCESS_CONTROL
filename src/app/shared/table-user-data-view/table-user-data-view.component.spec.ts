import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableUserDataViewComponent } from './table-user-data-view.component';

describe('TableUserDataViewComponent', () => {
  let component: TableUserDataViewComponent;
  let fixture: ComponentFixture<TableUserDataViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableUserDataViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableUserDataViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
