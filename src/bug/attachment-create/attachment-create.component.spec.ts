import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AttachmentCreateComponent} from './attachment-create.component';

describe('AttachmentCreateComponent', () => {
  let component: AttachmentCreateComponent;
  let fixture: ComponentFixture<AttachmentCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AttachmentCreateComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachmentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
