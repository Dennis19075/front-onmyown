import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PayableTabPage } from './payable-tab.page';

describe('Tab1Page', () => {
  let component: PayableTabPage;
  let fixture: ComponentFixture<PayableTabPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PayableTabPage],
      // imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PayableTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
