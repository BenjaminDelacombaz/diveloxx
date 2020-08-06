import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DiveShowPage } from './dive-show.page';

describe('DiveShowPage', () => {
  let component: DiveShowPage;
  let fixture: ComponentFixture<DiveShowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiveShowPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DiveShowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
