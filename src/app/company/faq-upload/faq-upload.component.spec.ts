import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqUploadComponent } from './faq-upload.component';

describe('FaqUploadComponent', () => {
  let component: FaqUploadComponent;
  let fixture: ComponentFixture<FaqUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
