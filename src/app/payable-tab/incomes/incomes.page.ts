import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { PayableService } from 'src/app/payable-tab/services/payable/payable.service';
import { Income } from './income.model';
import { RefreshPayableService } from '../services/refresh-payable/refresh-payable.service';
import { GetTotalOutcomesService } from '../services/getTotalOutcomes/get-total-outcomes.service';

@Component({
  selector: 'app-incomes',
  templateUrl: './incomes.page.html',
  styleUrls: ['./incomes.page.scss'],
})
export class IncomesPage implements OnInit {

  totalIncomes: number = 0;

  constructor(
    public _service: PayableService,
    private getTotalIncomesService: GetTotalOutcomesService
  ) {}

  ngOnInit(): void {
    this.getUpdatedTotalOutcomes();
  }

  getUpdatedTotalOutcomes() {
    this.getTotalIncomesService.callback.subscribe(
      (data) => {
        this.totalIncomes = data;
      }
    );
  }

}
