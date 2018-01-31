import { TestBed, inject } from '@angular/core/testing';

import { ControlGeneratorService } from './control-generator.service';

describe('ControlGeneratorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ControlGeneratorService]
    });
  });

  it('should be created', inject([ControlGeneratorService], (service: ControlGeneratorService) => {
    expect(service).toBeTruthy();
  }));
});
