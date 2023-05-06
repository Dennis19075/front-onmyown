import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Outcome } from '../../outcome.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonModal, ModalController, ToastController } from '@ionic/angular';
import { PayableService } from 'src/app/payable-tab/services/payable/payable.service';
import { FilterByDateService } from 'src/app/payable-tab/services/filterByDate/filter-by-date.service';
import { Subscription } from 'rxjs';
import { UpdateOutcomeComponent } from '../update-outcome/update-outcome.component';
import { RefreshPayableService } from 'src/app/payable-tab/services/refresh-payable/refresh-payable.service';
import { SearchInputService } from 'src/app/payable-tab/services/searchInput/search-input.service';
import { GetTotalOutcomesService } from 'src/app/payable-tab/services/getTotalOutcomes/get-total-outcomes.service';


@Component({
  selector: 'app-body-outcomes',
  templateUrl: './body-outcomes.component.html',
  styleUrls: ['./body-outcomes.component.scss'],
})
export class BodyOutcomesComponent implements OnInit, OnDestroy {
  @ViewChild(IonModal) modalFilters: IonModal;

  @Output() totalOutcomesOutput = new EventEmitter<number>();

  @Input() dateSelectedByDay: string;
  @Input() hideFilterInput: boolean;
  @Input() selectedDateFromCalendar: string;
  
  subscriptions: Subscription[] = [];

  countFilter: number;

  outcome: Outcome = {
    createdAt: new Date().toISOString(),
    editedAt: new Date().toISOString(),
    description: '',
    responsable: '',
    category: '',
    expense: 0,
    userId: '639a530c058b3ae812b0e1ec',
    id: '',
    exchange: ''
  };

  allOutcomes: any;
  outcomesSearchbar: any;
  totalOutcomes: number = 0;

  selectedDate: any;

  isModalOpen: boolean = false;

  outcomeForm: FormGroup;

  createdAtDateFilter: string = new Date().toISOString();

  descriptionSearch: string;

  categoryFilter: string = "all";
  weekFilter: number = 1;

  outcomeFiltersForm: FormGroup;

  @ViewChild(IonModal) modal: IonModal;

  constructor(
    public _service: PayableService,
    private formBuilder: FormBuilder,
    private filterByDate: FilterByDateService,
    private modalCtrl: ModalController,
    private refreshPayableService: RefreshPayableService,
    private searchInputService: SearchInputService,
    private getTotalOutcomesService: GetTotalOutcomesService,
    private toastController: ToastController
  ) {
  }

  async openModal(id: string) {
    const modal = await this.modalCtrl.create({
      component: UpdateOutcomeComponent,
      componentProps:{
        id
      },
    });

    modal.onDidDismiss()
      .then((data) => {
        this.getAllOutcomes(this.createdAtDateFilter.split(":").join("%3A"), this.categoryFilter);
    });
    return await modal.present();
  }

  ngOnInit() {
    this.initForm();
    if (this.selectedDateFromCalendar) {
      this.getOutcomesByDay();
    } else {
      // this.getListFilteredByDate();
      this.getAllOutcomes(this.createdAtDateFilter.split(":").join("%3A"), this.categoryFilter);
    }
  }

  getListFilteredByDate() {
    const observer1$: Subscription = this.filterByDate.callback.subscribe(
      (data) => {
        //when the use filter
        console.log("data filter: ",data);
        this.selectedDate = data;
        this.categoryFilter = data.category;
        this.createdAtDateFilter = data.date.split(":").join("%3A");
        this.getAllOutcomes(this.createdAtDateFilter, this.categoryFilter);
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

  getAllOutcomes(date: string, category: string) {
    this._service.GetOutcomesByFilters(date, category).subscribe((data) => {
      this.allOutcomes = data;
      this.totalSum();
      // this.totalOutcomesOutput.emit(this.totalOutcomes);
      this.getTotalOutcomesService.callback.emit(this.totalOutcomes);
    });
  }

  getOutcomesByWeek(date: string, category: string, week: string) {
    this._service.getOutcomesByWeek(date, category, week).subscribe(
      (data) => {
        this.allOutcomes = data;
        this.totalSum();
        this.getTotalOutcomesService.callback.emit(this.totalOutcomes);
      }
    )
  }

  getOutcomesByDay() {
    this._service.GetOutcomesByDay(this.selectedDateFromCalendar).subscribe(
      (data) => {
        console.log("data by day", data);
        this.allOutcomes = data;
        this.totalSum();
        // this.totalOutcomesOutput.emit(this.totalOutcomes);
        this.getTotalOutcomesService.callback.emit(this.totalOutcomes);
      });
  }

  totalSum() {
    this.totalOutcomes = 0;
    this.allOutcomes.forEach((outcome: any) => {
      this.totalOutcomes += outcome.expense;
    });
  }

  deleteOutcome(item: any) {
    this._service.deleteOutcome(item.id).subscribe((res) => {
      this.getAllOutcomes(this.createdAtDateFilter.split(":").join("%3A"), "all");
      this.refreshPayableService.callback.emit(res);
      this.deleteOutcomeToaster();
    });
  }

  async deleteOutcomeToaster() {
    const toast = await this.toastController.create({
      message: 'Outcome deleted!',
      duration: 2500,
      color: 'danger',
      position: 'bottom'
    });

    await toast.present();
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.outcomeForm.reset();
  }

  initForm() {
    this.outcomeFiltersForm = new FormGroup({
      date: new FormControl(new Date().toISOString(), [Validators.required]),
      category: new FormControl('all', [Validators.required]),
      week: new FormControl('0', [Validators.required]),
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

    console.log("this.outcomeFiltersForm.value" ,this.outcomeFiltersForm.value);

    if (this.outcomeFiltersForm.value.week=='0') {
      this.getAllOutcomes(this.outcomeFiltersForm.value.date, this.outcomeFiltersForm.value.category);
      this.countFilter -= 1;
    } else {
      //call the new endpoint to filter by week
      console.log("filter by week!");
      this.getOutcomesByWeek(
        this.outcomeFiltersForm.value.date, 
        this.outcomeFiltersForm.value.category,
        this.outcomeFiltersForm.value.week
        );
    }

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
    this.outcomeFiltersForm.value.date = today.date;
    this.outcomeFiltersForm.value.category = today.category;
    this.initForm();
    this.getAllOutcomes(this.outcomeFiltersForm.value.date, this.outcomeFiltersForm.value.category)
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
      case "alimentacion":
        return "Alimentación";
        break;
      case "diversion":
        return "Diversión";
        break;
      case "viajes":
        return "Viajes";
        break;
      case "musica":
        return "Música";
        break;
      case "deportes":
        return "Deportes";
        break;
      case "casa":
        return "Casa";
        break;
      case "profesional":
        return "Profesional";
        break;
      case "transporte":
        return "Transporte";
        break;
      case "ropa":
        return "Ropa";
        break;
      case "saludehigiene":
        return "Salud e Higiene";
        break;
      case "cuentasypagos":
        return "Cuentas y pagos";
        break;
      case "otros":
        return "Otros gastos";
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
