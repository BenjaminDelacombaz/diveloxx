import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DiverEditPage } from './diver-edit.page';

describe('DiverEditPage', () => {
  let component: DiverEditPage;
  let fixture: ComponentFixture<DiverEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiverEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DiverEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
