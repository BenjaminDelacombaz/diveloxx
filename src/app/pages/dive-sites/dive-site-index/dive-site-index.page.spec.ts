import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DiveSiteIndexPage } from './dive-site-index.page';

describe('DiveSiteIndexPage', () => {
  let component: DiveSiteIndexPage;
  let fixture: ComponentFixture<DiveSiteIndexPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiveSiteIndexPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DiveSiteIndexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
