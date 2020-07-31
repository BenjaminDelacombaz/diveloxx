import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DiveSiteEditPage } from './dive-site-edit.page';

describe('DiveSiteEditPage', () => {
  let component: DiveSiteEditPage;
  let fixture: ComponentFixture<DiveSiteEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiveSiteEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DiveSiteEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
