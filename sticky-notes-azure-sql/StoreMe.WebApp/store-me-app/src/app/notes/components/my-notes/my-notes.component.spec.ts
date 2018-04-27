import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyNotesComponent } from './my-notes.component';

describe('MyNotesComponent', () => {
  let component: MyNotesComponent;
  let fixture: ComponentFixture<MyNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
