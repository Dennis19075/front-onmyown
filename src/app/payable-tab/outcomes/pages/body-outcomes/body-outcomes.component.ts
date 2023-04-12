import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Outcome } from '../../outcome.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonModal, ModalController } from '@ionic/angular';
import { PayableService } from 'src/app/payable-tab/services/payable/payable.service';
import { Router } from '@angular/router';
import { FilterByDateService } from 'src/app/payable-tab/services/filterByDate/filter-by-date.service';
import { Subscription } from 'rxjs';
import { UpdateOutcomeComponent } from '../update-outcome/update-outcome.component';

@Component({
  selector: 'app-body-outcomes',
  templateUrl: './body-outcomes.component.html',
  styleUrls: ['./body-outcomes.component.scss'],
})
export class BodyOutcomesComponent implements OnInit, OnDestroy {
  @Output() totalOutcomesOutput = new EventEmitter<number>();

  subscriptions: Subscription[] = [];

  outcome: Outcome = {
    createdAt: new Date().toISOString(),
    editedAt: new Date().toISOString(),
    description: '',
    responsable: '',
    category: '',
    expense: 0,
    userId: '639a530c058b3ae812b0e1ec', //it should be the user logged in
    id: ''
  };

  allOutcomes: any;
  totalOutcomes: number = 0;

  selectedDate: any;

  isModalOpen: boolean = false;

  outcomeForm: FormGroup;

  createdAtDateFilter: string = new Date().toISOString();

  @ViewChild(IonModal) modal: IonModal;

  constructor(
    public _service: PayableService,
    private router: Router,
    private formBuilder: FormBuilder,
    private filterByDate: FilterByDateService,
    private modalCtrl: ModalController
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
        this.getAllOutcomes(this.createdAtDateFilter.split(":").join("%3A"));
        
    });
    return await modal.present();
  }

  ngOnInit() {
    this.initForm();
    //TODO: move these function inside the subscription to filter always by month. I have current month and
    // year set by default so It should work when the user enter at the first time.
    this.getListFilteredByDate();
    //for the first time
    this.getAllOutcomes(this.createdAtDateFilter.split(":").join("%3A"));
    
  }

  getListFilteredByDate() {
    const observer1$: Subscription = this.filterByDate.callback.subscribe(
      (data) => {
        //when the use filter
        this.selectedDate = data;
        this.getAllOutcomes(data.date.split(":").join("%3A"));
      }
    );

    this.subscriptions.push(observer1$);
  }

  initForm() {

    this.outcomeForm = this.formBuilder.group({
      // createdAt: ['', Validators.required],
      description: new FormControl('', [Validators.required]),
      // responsable: new FormControl('', [Validators.required]),
      expense: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      createdAt: new FormControl(new Date().toISOString(), []),
    });
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  }

  getAllOutcomes(date: string) {
    this._service.GetOutcomesByMonthAndYear(date).subscribe((data) => {
      console.log("DATA LIST: ", data);
      
      this.allOutcomes = data;
      this.totalSum();
      this.totalOutcomesOutput.emit(this.totalOutcomes);
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
      this.getAllOutcomes(this.createdAtDateFilter);
    });
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.outcomeForm.reset();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
