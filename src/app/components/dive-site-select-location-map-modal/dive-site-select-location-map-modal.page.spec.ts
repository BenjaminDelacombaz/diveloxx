import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DiveSiteSelectLocationMapModalPage } from './dive-site-select-location-map-modal.page';

describe('DiveSiteSelectLocationMapModalPage', () => {
  let component: DiveSiteSelectLocationMapModalPage;
  let fixture: ComponentFixture<DiveSiteSelectLocationMapModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiveSiteSelectLocationMapModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DiveSiteSelectLocationMapModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
