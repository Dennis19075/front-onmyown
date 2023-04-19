import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { PayableService } from 'src/app/payable-tab/services/payable/payable.service';
import { Outcome } from './outcome.model';
import { RefreshPayableService } from '../services/refresh-payable/refresh-payable.service';

@Component({
  selector: 'app-outcomes',
  templateUrl: './outcomes.page.html',
  styleUrls: ['./outcomes.page.scss'],
})
export class OutcomesPage implements OnInit {

  totalOutcomes: number = 0;

  isCalendarMode: boolean = false;

  dateSelectedByDay: string;

  constructor(
    public _service: PayableService,
  ) {
  }

  ngOnInit(): void {
    
  }

  getTotalOutcomes($event: number) {
     this.totalOutcomes = $event;
  }
  
  activateCalendarMode($event: any) {
    if (!this.isCalendarMode) {
      this.isCalendarMode = true;
    } else {
      this.isCalendarMode = false;
    }
  }

  getOutcomeByDay($event: any) {

    if ($event) {
      console.log("filtering by day: ", $event);
      this.dateSelectedByDay = $event;
      this.isCalendarMode = false;
    } else {
      console.log("show all outcomes");
      this.isCalendarMode = false;
    }
  }
}
