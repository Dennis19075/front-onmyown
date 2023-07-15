import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CartSimulationPage } from './cart-simulation.page';

describe('CartSimulationPage', () => {
  let component: CartSimulationPage;
  let fixture: ComponentFixture<CartSimulationPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartSimulationPage],
      // imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CartSimulationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
