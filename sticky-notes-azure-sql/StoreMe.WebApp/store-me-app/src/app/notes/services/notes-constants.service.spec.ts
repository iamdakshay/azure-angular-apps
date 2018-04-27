import { TestBed, inject } from '@angular/core/testing';

import { NotesConstantsService } from './notes-constants.service';

describe('NotesConstantsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotesConstantsService]
    });
  });

  it('should be created', inject([NotesConstantsService], (service: NotesConstantsService) => {
    expect(service).toBeTruthy();
  }));
});
