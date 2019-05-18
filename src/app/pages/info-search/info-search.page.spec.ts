import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoSearchPage } from './info-search.page';

describe('InfoSearchPage', () => {
  let component: InfoSearchPage;
  let fixture: ComponentFixture<InfoSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoSearchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
