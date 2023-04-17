import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IonModal, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { FilterByDateService } from 'src/app/payable-tab/services/filterByDate/filter-by-date.service';
import { PayableService } from 'src/app/payable-tab/services/payable/payable.service';
import { SearchInputService } from 'src/app/payable-tab/services/searchInput/search-input.service';

@Component({
  selector: 'app-header-outcomes',
  templateUrl: './header-outcomes.component.html',
  styleUrls: ['./header-outcomes.component.scss'],
})
export class HeaderOutcomesComponent implements OnInit {
  @ViewChild(IonModal) modalFilters: IonModal;

  @Output() isCalendarModeOutcomeOutput = new EventEmitter<number>();

  @Input() isCalendarMode: boolean;

  filters: any = {
    date: new Date(),
  };

  outcomeFiltersForm: FormGroup;

  constructor(
    public _service: PayableService,
    private router: Router,
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private filterByDate: FilterByDateService,
    private searchInputService: SearchInputService
  ) {

  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.outcomeFiltersForm = new FormGroup({
      date: new FormControl(new Date().toISOString(), [Validators.required]),
      category: new FormControl('all', [Validators.required])
    });
  }

  applyFilter() {
    console.log('form ', this.outcomeFiltersForm.value);
    this.filterByDate.callback.emit(this.outcomeFiltersForm.value);
    this.modalFilters.dismiss({
      // this will dismiss current open modal.
      dismissed: true,
    });
    // this.outcomeFiltersForm.reset();
  }

  // getOutcomesByDay() {
    
  // }

  cancel() {
    this.modalFilters.dismiss(null, 'cancel');
    this.outcomeFiltersForm.reset();
  }

  resetFilters() {
    let today = {date: new Date().toISOString()};
    this.outcomeFiltersForm.reset();
    console.log("today: ", today);
    
    this.filterByDate.callback.emit(today);
  }

  calendarMode() {
    this.isCalendarModeOutcomeOutput.emit();
  }

  handleInput(event: any) {
    console.log("EVENTO SEARCH: ", event.target.value);
    if (event.target.value!="") {
      this.searchInputService.callback.emit(event.target.value);
    } else {
      this.searchInputService.callback.emit("none");
    }
  }

}
