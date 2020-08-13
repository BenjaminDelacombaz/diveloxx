import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DiveEditPage } from './dive-edit.page';

describe('DiveEditPage', () => {
  let component: DiveEditPage;
  let fixture: ComponentFixture<DiveEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiveEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DiveEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
