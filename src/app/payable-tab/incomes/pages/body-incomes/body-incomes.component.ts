import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { PayableService } from 'src/app/payable-tab/services/payable/payable.service';
import { Income } from '../../income.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FilterByDateService } from 'src/app/payable-tab/services/filterByDate/filter-by-date.service';
import { RefreshPayableService } from 'src/app/payable-tab/services/refresh-payable/refresh-payable.service';
import { SearchInputService } from 'src/app/payable-tab/services/searchInput/search-input.service';
import { GetTotalOutcomesService } from 'src/app/payable-tab/services/getTotalOutcomes/get-total-outcomes.service';
import { UpdateIncomeComponent } from '../update-income/update-income.component';

@Component({
  selector: 'app-body-incomes',
  templateUrl: './body-incomes.component.html',
  styleUrls: ['./body-incomes.component.scss'],
})
export class BodyIncomesComponent implements OnInit {

  @ViewChild(IonModal) modalFilters: IonModal;

  @Output() totalIncomesOutput = new EventEmitter<number>();

  @Input() dateSelectedByDay: string;
  @Input() hideFilterInput: boolean;
  @Input() selectedDateFromCalendar: string;
  
  subscriptions: Subscription[] = [];

  countFilter: number;

  income: Income = {
    createdAt: new Date().toISOString(),
    editedAt: new Date().toISOString(),
    description: '',
    enable: true,
    category: '',
    expense: 0,
    userId: '639a530c058b3ae812b0e1ec',
    id: '',
    exchange: ''
  };

  allIncomes: any;
  incomesSearchbar: any;
  totalIncomes: number = 0;

  selectedDate: any;

  isModalOpen: boolean = false;

  incomeForm: FormGroup;

  createdAtDateFilter: string = new Date().toISOString();

  descriptionSearch: string;

  categoryFilter: string = "all";

  incomeFiltersForm: FormGroup;

  @ViewChild(IonModal) modal: IonModal;

  constructor(
    public _service: PayableService,
    private formBuilder: FormBuilder,
    private filterByDate: FilterByDateService,
    private modalCtrl: ModalController,
    private refreshPayableService: RefreshPayableService,
    private searchInputService: SearchInputService,
    private getTotalIncomesService: GetTotalOutcomesService
  ) {
  }

  async openModal(id: string) {
    const modal = await this.modalCtrl.create({
      component: UpdateIncomeComponent,
      componentProps:{
        id
      },
    });

    modal.onDidDismiss()
      .then((data) => {
        this.getAllIncomes(this.createdAtDateFilter.split(":").join("%3A"), this.categoryFilter);
    });
    return await modal.present();
  }

  ngOnInit() {
    this.initForm();
    // if (this.selectedDateFromCalendar) {
    //   this.getIncomesByDay();
    // } else {
    //   this.getListFilteredByDate();
    //   this.getAllIncomes(this.createdAtDateFilter.split(":").join("%3A"), this.categoryFilter);
    // }
    this.getAllIncomes(this.createdAtDateFilter.split(":").join("%3A"), this.categoryFilter);
  }

  getListFilteredByDate() {
    const observer1$: Subscription = this.filterByDate.callback.subscribe(
      (data) => {
        //when the use filter
        console.log("data filter: ",data);
        this.selectedDate = data;
        this.categoryFilter = data.category;
        this.createdAtDateFilter = data.date.split(":").join("%3A");
        this.getAllIncomes(this.createdAtDateFilter, this.categoryFilter);
      }
    );
    this.subscriptions.push(observer1$);
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  }

  getAllIncomes(date: string, category: string) {
    this._service.GetIncomesByFilters(date, category).subscribe((data) => {
      this.allIncomes = data;
      this.totalSum();
      console.log("TOTAL INCOMES: ", this.totalIncomes);
      
      this.getTotalIncomesService.callback.emit(this.totalIncomes);
    });
  }

  getIncomesByDay() {
    this._service.GetOutcomesByDay(this.selectedDateFromCalendar).subscribe(
      (data) => {
        console.log("data by day", data);
        this.allIncomes = data;
        this.totalSum();
        this.getTotalIncomesService.callback.emit(this.totalIncomes);
      });
  }

  totalSum() {
    this.totalIncomes = 0;
    this.allIncomes.forEach((outcome: any) => {
      this.totalIncomes += outcome.expense;
    });
  }

  deleteIncome(item: any) {
    this._service.deleteIncome(item.id).subscribe((res) => {
      this.getAllIncomes(this.createdAtDateFilter.split(":").join("%3A"), "all");
      this.refreshPayableService.callback.emit(res);
    });
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.incomeForm.reset();
  }

  initForm() {
    this.incomeFiltersForm = new FormGroup({
      date: new FormControl(new Date().toISOString(), [Validators.required]),
      category: new FormControl('all', [Validators.required])
    });
  }

  applyFilter() {

    console.log("this.outcomeFiltersForm.value.date ", this.incomeFiltersForm.value.date);
    let selectedDate = new Date(this.incomeFiltersForm.value.date)

    this.countFilter = Object.keys(this.incomeFiltersForm.value).length;
    if (this.incomeFiltersForm.value.category=="all") {
      this.countFilter -= 1;
    }
    if (selectedDate.getMonth()==new Date().getMonth() && selectedDate.getFullYear()==new Date().getFullYear()) {
      this.countFilter -= 1;
    }
    console.log("this.outcomeFiltersForm.value" ,this.incomeFiltersForm.value);
    this.getAllIncomes(this.incomeFiltersForm.value.date, this.incomeFiltersForm.value.category)
    // this.filterByDate.callback.emit(this.outcomeFiltersForm.value);
    this.modalFilters.dismiss({
      // this will dismiss current open modal.
      dismissed: true,
    });
  }

  cancelFilters() {
    this.modalFilters.dismiss(null, 'cancel');
  }

  resetFilters() {
    let today = {date: new Date().toISOString(), category: 'all'};
    this.incomeFiltersForm.value.date = today.date;
    this.incomeFiltersForm.value.category = today.category;
    this.initForm();
    this.getAllIncomes(this.incomeFiltersForm.value.date, this.incomeFiltersForm.value.category)
  }


  handleInput(event: any) {
    if (event.target.value!="") {
      this.searchInputService.callback.emit(event.target.value);
    } else {
      this.searchInputService.callback.emit("");
    }
  }

  getCategory(category: string) {
    switch (category) {
      case "sueldo":
        return "Sueldo";
        break;
      case "musica":
        return "Música";
        break;
      case "otros":
        return "Otros";
        break;
      default:
        return ""
        break;
    }
  }

  getIconExchange(exchange: string) {
    switch (exchange) {
      case "EUR":
        return "€";
        break;
      case "USD":
        return "$";
        break;
      default:
        return ""
        break;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

}
