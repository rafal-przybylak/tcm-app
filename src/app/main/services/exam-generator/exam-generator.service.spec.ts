import { TestBed, inject } from '@angular/core/testing';

import { ExamGeneratorService } from './exam-generator.service';

describe('ExamGeneratorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExamGeneratorService]
    });
  });

  it('should be created', inject([ExamGeneratorService], (service: ExamGeneratorService) => {
    expect(service).toBeTruthy();
  }));
});
