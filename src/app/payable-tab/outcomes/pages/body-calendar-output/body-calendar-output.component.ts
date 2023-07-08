import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonModal, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { PayableService } from 'src/app/payable-tab/services/payable/payable.service';
import { UpdateOutcomeComponent } from '../update-outcome/update-outcome.component';
import { FilterByDateService } from 'src/app/payable-tab/services/filterByDate/filter-by-date.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DateFilterByDayService } from 'src/app/payable-tab/services/dateFilterByDay/date-filter-by-day.service';

@Component({
  selector: 'app-body-calendar-output',
  templateUrl: './body-calendar-output.component.html',
  styleUrls: ['./body-calendar-output.component.scss'],
})
export class BodyCalendarOutputComponent implements OnInit {

  @Input() totalOutcomes: number;

  @ViewChild(IonModal) modalPerday: IonModal;

  allOutcomes: any;

  subscriptions: Subscription[] = [];

  createdAtDateFilter: string = new Date().toISOString();

  @Output() isCalendarModeOutcomeOutput = new EventEmitter<number>();

  hideFilterInput: boolean = true;

  @ViewChild(IonModal) modal: IonModal;

  outcomeForm: FormGroup;

  selectedDate: any;

  daySelected: any;

  constructor(
    public _service: PayableService,
    private dateFilterByDayService: DateFilterByDayService
    ) { }

  ngOnInit() {
  }

  emitSelectedDate() {
    this.dateFilterByDayService.callback.emit(this.selectedDate);
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  cancelFilters() {
    this.modalPerday.dismiss(null, 'cancel');
  }
}
