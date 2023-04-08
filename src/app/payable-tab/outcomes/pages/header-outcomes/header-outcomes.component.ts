import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-header-outcomes',
  templateUrl: './header-outcomes.component.html',
  styleUrls: ['./header-outcomes.component.scss'],
})
export class HeaderOutcomesComponent implements OnInit {
  @ViewChild(IonModal) modalFilters: IonModal;

  filters: any = {
    date: new Date(),
  };

  totalOutcomes: number = 0;

  outcomeFiltersForm: FormGroup;

  constructor(
    public _service: PayableService,
    private router: Router,
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private filterByDate: FilterByDateService
  ) {
    this.initForm();
  }

  initForm() {
    this.outcomeFiltersForm = new FormGroup({
      date: new FormControl(new Date().toISOString(), [Validators.required]),
    });
  }

  ngOnInit(): void {}

  applyFilter() {
    console.log('form ', this.outcomeFiltersForm.value);
    this.filterByDate.callback.emit(this.outcomeFiltersForm.value);
    this.modalFilters.dismiss({
      // this will dismiss current open modal.
      dismissed: true,
    });
    // this.outcomeFiltersForm.reset();
  }

  cancel() {
    this.modalFilters.dismiss(null, 'cancel');
    this.outcomeFiltersForm.reset();
  }
}