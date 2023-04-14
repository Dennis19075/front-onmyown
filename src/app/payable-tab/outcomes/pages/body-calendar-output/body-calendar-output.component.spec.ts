import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BodyCalendarOutputComponent } from './body-calendar-output.component';

describe('BodyCalendarOutputComponent', () => {
  let component: BodyCalendarOutputComponent;
  let fixture: ComponentFixture<BodyCalendarOutputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyCalendarOutputComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BodyCalendarOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
