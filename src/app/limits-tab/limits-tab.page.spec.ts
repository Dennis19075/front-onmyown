import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LimitTabPage } from './limits-tab.page';

describe('LimitTabPage', () => {
  let component: LimitTabPage;
  let fixture: ComponentFixture<LimitTabPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LimitTabPage],
      // imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LimitTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
