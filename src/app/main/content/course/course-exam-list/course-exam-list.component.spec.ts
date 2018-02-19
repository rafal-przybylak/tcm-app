import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseExamListComponent } from './course-exam-list.component';

describe('CourseExamListComponent', () => {
  let component: CourseExamListComponent;
  let fixture: ComponentFixture<CourseExamListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseExamListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseExamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
