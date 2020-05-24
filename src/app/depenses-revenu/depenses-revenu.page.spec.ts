import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DepensesRevenuPage } from './depenses-revenu.page';

describe('DepensesRevenuPage', () => {
  let component: DepensesRevenuPage;
  let fixture: ComponentFixture<DepensesRevenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepensesRevenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DepensesRevenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
