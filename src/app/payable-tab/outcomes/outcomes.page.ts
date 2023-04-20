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

  tabSelected: string = "outcome-list";

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
    this.tabSelected = $event;
  }

  getOutcomeByDay($event: any) {

    console.log("event: ", $event);

    this.dateSelectedByDay = $event;
    this.tabSelected = "outcome-list";

    console.log("tabSleceted: ", this.tabSelected);
    
    // if ($event) {
    //   console.log("filtering by day: ", $event);
    //   this.dateSelectedByDay = $event;
    // } else {
    //   console.log("show all outcomes");
    // }
  }
}
