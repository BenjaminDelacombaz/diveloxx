import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyProfileIndexPage } from './my-profile-index.page';

describe('MyProfileIndexPage', () => {
  let component: MyProfileIndexPage;
  let fixture: ComponentFixture<MyProfileIndexPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProfileIndexPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyProfileIndexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
