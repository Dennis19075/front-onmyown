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
import { IonModal, ModalController } from '@ionic/angular';
import { PayableService } from 'src/app/payable-tab/services/payable/payable.service';
import { FilterByDateService } from 'src/app/payable-tab/services/filterByDate/filter-by-date.service';
import { Subscription } from 'rxjs';
import { UpdateOutcomeComponent } from '../update-outcome/update-outcome.component';
import { RefreshPayableService } from 'src/app/payable-tab/services/refresh-payable/refresh-payable.service';
import { SearchInputService } from 'src/app/payable-tab/services/searchInput/search-input.service';


@Component({
  selector: 'app-body-outcomes',
  templateUrl: './body-outcomes.component.html',
  styleUrls: ['./body-outcomes.component.scss'],
})
export class BodyOutcomesComponent implements OnInit, OnDestroy {
  @Output() totalOutcomesOutput = new EventEmitter<number>();

  @Input() dateSelectedByDay: string;

  subscriptions: Subscription[] = [];

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

  @ViewChild(IonModal) modal: IonModal;

  constructor(
    public _service: PayableService,
    private formBuilder: FormBuilder,
    private filterByDate: FilterByDateService,
    private modalCtrl: ModalController,
    private refreshPayableService: RefreshPayableService,
    private searchInputService: SearchInputService
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
    if (this.dateSelectedByDay) {
      this.getOutcomesByDay();
    } else {
      this.getListFilteredByDate();
    }
    this.getListFilteredBySearch();
    //for the first time
    this.getAllOutcomes(this.createdAtDateFilter.split(":").join("%3A"), this.categoryFilter);
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

  // initForm() {

  //   this.outcomeForm = this.formBuilder.group({
  //     // createdAt: ['', Validators.required],
  //     description: new FormControl('', [Validators.required]),
  //     // responsable: new FormControl('', [Validators.required]),
  //     expense: new FormControl('', [Validators.required]),
  //     category: new FormControl('', [Validators.required]),
  //     createdAt: new FormControl(new Date().toISOString(), []),
  //   });
  // }

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  }

  getAllOutcomes(date: string, category: string) {
    this._service.GetOutcomesByFilters(date, category).subscribe((data) => {
      // console.log("DATA LIST: ", data);
      
      this.allOutcomes = data;
      this.totalSum();
      this.totalOutcomesOutput.emit(this.totalOutcomes);
    });
  }

  getOutcomesByDay() {
    this._service.GetOutcomesByDay(this.dateSelectedByDay).subscribe(
      (data) => {
        console.log("data by day", data);
        this.allOutcomes = data;
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
    });
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.outcomeForm.reset();
  }

  getListFilteredBySearch() {
    const observer2$: Subscription = this.searchInputService.callback.subscribe(
      (description) => {
        this.descriptionSearch = description;
      }
    );

    this.subscriptions.push(observer2$);
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
