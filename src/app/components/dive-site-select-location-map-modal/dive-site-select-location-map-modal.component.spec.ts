import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DiveSiteSelectLocationMapModalComponent } from './dive-site-select-location-map-modal.component';

describe('DiveSiteSelectLocationMapModalComponent', () => {
  let component: DiveSiteSelectLocationMapModalComponent;
  let fixture: ComponentFixture<DiveSiteSelectLocationMapModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiveSiteSelectLocationMapModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DiveSiteSelectLocationMapModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
