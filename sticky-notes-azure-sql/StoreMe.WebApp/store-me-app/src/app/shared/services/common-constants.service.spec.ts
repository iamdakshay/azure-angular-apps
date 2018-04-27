import { TestBed, inject } from '@angular/core/testing';

import { CommonConstantsService } from './common-constants.service';

describe('CommonConstantsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommonConstantsService]
    });
  });

  it('should be created', inject([CommonConstantsService], (service: CommonConstantsService) => {
    expect(service).toBeTruthy();
  }));
});
