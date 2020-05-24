import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateVoyagePage } from './create-voyage.page';

describe('CreateVoyagePage', () => {
  let component: CreateVoyagePage;
  let fixture: ComponentFixture<CreateVoyagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVoyagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateVoyagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
