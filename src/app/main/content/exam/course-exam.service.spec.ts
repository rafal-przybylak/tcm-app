import { TestBed, inject } from '@angular/core/testing';

import { CourseExamService } from './course-exam.service';

describe('CourseExamService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourseExamService]
    });
  });

  it('should be created', inject([CourseExamService], (service: CourseExamService) => {
    expect(service).toBeTruthy();
  }));
});
