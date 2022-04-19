import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyplansComponent } from './myplans.component';

describe('MyplansComponent', () => {
  let component: MyplansComponent;
  let fixture: ComponentFixture<MyplansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyplansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyplansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
