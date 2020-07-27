import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DiverIndexPage } from './diver-index.page';

describe('DiverIndexPage', () => {
  let component: DiverIndexPage;
  let fixture: ComponentFixture<DiverIndexPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiverIndexPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DiverIndexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
