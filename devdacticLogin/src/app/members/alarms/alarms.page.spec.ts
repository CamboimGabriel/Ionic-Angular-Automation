import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlarmsPage } from './alarms.page';

describe('AlarmsPage', () => {
  let component: AlarmsPage;
  let fixture: ComponentFixture<AlarmsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlarmsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
