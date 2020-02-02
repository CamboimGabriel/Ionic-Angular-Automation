import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CriaralarmePage } from './criaralarme.page';

describe('CriaralarmePage', () => {
  let component: CriaralarmePage;
  let fixture: ComponentFixture<CriaralarmePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriaralarmePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CriaralarmePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
