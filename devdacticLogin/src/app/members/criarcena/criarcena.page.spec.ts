import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CriarcenaPage } from './criarcena.page';

describe('CriarcenaPage', () => {
  let component: CriarcenaPage;
  let fixture: ComponentFixture<CriarcenaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarcenaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CriarcenaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
