import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BugViewDetailsComponent} from './bug-view-details.component';

describe('BugViewDetailsComponent', () => {
  let component: BugViewDetailsComponent;
  let fixture: ComponentFixture<BugViewDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BugViewDetailsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BugViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
