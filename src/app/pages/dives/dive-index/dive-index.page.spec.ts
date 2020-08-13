import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DiveIndexPage } from './dive-index.page';

describe('DiveIndexPage', () => {
  let component: DiveIndexPage;
  let fixture: ComponentFixture<DiveIndexPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiveIndexPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DiveIndexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
