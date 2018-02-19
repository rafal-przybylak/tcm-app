import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseExamEvalComponent } from './course-exam-eval.component';

describe('CourseExamEvalComponent', () => {
  let component: CourseExamEvalComponent;
  let fixture: ComponentFixture<CourseExamEvalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseExamEvalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseExamEvalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
