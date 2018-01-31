import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamViewerComponent } from './exam-viewer.component';

describe('ExamViewerComponent', () => {
  let component: ExamViewerComponent;
  let fixture: ComponentFixture<ExamViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
