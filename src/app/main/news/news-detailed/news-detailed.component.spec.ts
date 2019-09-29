import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsDetailedComponent } from './news-detailed.component';

describe('NewsDetailedComponent', () => {
  let component: NewsDetailedComponent;
  let fixture: ComponentFixture<NewsDetailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsDetailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
