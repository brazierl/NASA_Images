import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesSelectorComponent } from './images-selector.component';

describe('ImagesSelectorComponent', () => {
  let component: ImagesSelectorComponent;
  let fixture: ComponentFixture<ImagesSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagesSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
