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

  categoryFilter: string = "all";

  filters: any = {
    date: new Date(),
  };

  outcomeFiltersForm: FormGroup;

  countFilter: number;

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
      category: new FormControl('all', [Validators.required]),
      week: new FormControl(0, [Validators.required]),
    });
  }

  applyFilter() {

    console.log("this.outcomeFiltersForm.value.date ", this.outcomeFiltersForm.value.date);
    let selectedDate = new Date(this.outcomeFiltersForm.value.date)

    this.countFilter = Object.keys(this.outcomeFiltersForm.value).length;
    if (this.outcomeFiltersForm.value.category=="all") {
      this.countFilter -= 1;
    }
    if (selectedDate.getMonth()==new Date().getMonth() && selectedDate.getFullYear()==new Date().getFullYear()) {
      this.countFilter -= 1;
    }
    
    this.filterByDate.callback.emit(this.outcomeFiltersForm.value);
    this.modalFilters.dismiss({
      // this will dismiss current open modal.
      dismissed: true,
    });
  }

  // getOutcomesByDay() {
    
  // }

  cancel() {
    this.modalFilters.dismiss(null, 'cancel');
    // this.outcomeFiltersForm.reset();
  }

  resetFilters() {
    let today = {date: new Date().toISOString(), category: 'all'};
    this.outcomeFiltersForm.value.date = today.date;
    this.outcomeFiltersForm.value.category = today.category;
    this.initForm();
    
    this.filterByDate.callback.emit(today);
  }

  changeOutcomeTabs($event: any) {
    console.log("$event: ", $event.detail.value);
    
    this.isCalendarModeOutcomeOutput.emit($event.detail.value);
  }

  handleInput(event: any) {
    if (event.target.value!="") {
      this.searchInputService.callback.emit(event.target.value);
    } else {
      this.searchInputService.callback.emit("");
    }
  }

}
