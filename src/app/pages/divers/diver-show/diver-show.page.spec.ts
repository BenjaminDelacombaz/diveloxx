import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DiverShowPage } from './diver-show.page';

describe('DiverShowPage', () => {
  let component: DiverShowPage;
  let fixture: ComponentFixture<DiverShowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiverShowPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DiverShowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
