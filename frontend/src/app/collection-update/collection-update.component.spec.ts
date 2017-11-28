import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionUpdateComponent } from './collection-update.component';

describe('CollectionUpdateComponent', () => {
  let component: CollectionUpdateComponent;
  let fixture: ComponentFixture<CollectionUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
