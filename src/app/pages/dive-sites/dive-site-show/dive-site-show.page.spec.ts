import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DiveSiteShowPage } from './dive-site-show.page';

describe('DiveSiteShowPage', () => {
  let component: DiveSiteShowPage;
  let fixture: ComponentFixture<DiveSiteShowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiveSiteShowPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DiveSiteShowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
