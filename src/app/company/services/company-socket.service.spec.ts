import { TestBed } from '@angular/core/testing';

import { CompanySocketService } from './company-socket.service';

describe('CompanySocketService', () => {
  let service: CompanySocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanySocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
