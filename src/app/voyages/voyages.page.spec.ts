import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VoyagesPage } from './voyages.page';

describe('VoyagesPage', () => {
  let component: VoyagesPage;
  let fixture: ComponentFixture<VoyagesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoyagesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VoyagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
