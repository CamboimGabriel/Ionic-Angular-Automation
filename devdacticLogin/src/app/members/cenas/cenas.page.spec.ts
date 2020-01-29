import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CenasPage } from './cenas.page';

describe('CenasPage', () => {
  let component: CenasPage;
  let fixture: ComponentFixture<CenasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CenasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
