import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { PayableService } from 'src/app/payable-tab/services/payable/payable.service';
import { Outcome } from './outcome.model';

@Component({
  selector: 'app-outcomes',
  templateUrl: './outcomes.page.html',
  styleUrls: ['./outcomes.page.scss'],
})
export class OutcomesPage implements OnInit {

  totalOutcomes: number = 0;

  isCalendarMode: boolean = false;

  constructor(
    public _service: PayableService,
    private router: Router,
    private formBuilder: FormBuilder
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
}
