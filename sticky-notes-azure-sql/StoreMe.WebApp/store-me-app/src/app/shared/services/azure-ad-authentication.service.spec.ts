import { TestBed, inject } from '@angular/core/testing';

import { AzureAdAuthenticationService } from './azure-ad-authentication.service';

describe('AzureAdAuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AzureAdAuthenticationService]
    });
  });

  it('should be created', inject([AzureAdAuthenticationService], (service: AzureAdAuthenticationService) => {
    expect(service).toBeTruthy();
  }));
});
