import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPostPage } from './info-post.page';

describe('InfoPostPage', () => {
  let component: InfoPostPage;
  let fixture: ComponentFixture<InfoPostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoPostPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
