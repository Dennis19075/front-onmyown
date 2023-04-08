import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Outcome } from '../../outcome.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { PayableService } from 'src/app/payable-tab/services/payable/payable.service';
import { Router } from '@angular/router';
import { FilterByDateService } from 'src/app/payable-tab/services/filterByDate/filter-by-date.service';
import { Subscription } from 'rxjs';

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
  };

  allOutcomes: any;
  totalOutcomes: number = 0;

  isModalOpen: boolean = false;

  outcomeForm: FormGroup;

  @ViewChild(IonModal) modal: IonModal;

  constructor(
    public _service: PayableService,
    private router: Router,
    private formBuilder: FormBuilder,
    private filterByDate: FilterByDateService
  ) {
    this.initForm();
  }

  initForm() {
    this.outcomeForm = this.formBuilder.group({
      // createdAt: ['', Validators.required],
      description: ['', Validators.required],
      responsable: ['', Validators.required],
      expense: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  ngOnInit() {
    //TODO: move these function inside the subscription to filter always by month. I have current month and
    // year set by default so It should work when the user enter at the first time.
    this.getAllOutcomes();

    const observer1$: Subscription = this.filterByDate.callback.subscribe(
      (date) => {
        console.log('HE RECIBIDO EL DATE: ', date);
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
  // ngOnChanges() {}

  // ionViewWillEnter() {
  //   this.getAllOutcomes();
  // }

  getAllOutcomes() {
    this._service.getOutcomes().subscribe((data) => {
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
  // selectItem(item: any) {
  //   console.log(item);
  //   this.router.navigate(['/tabs/payable/outcomes/manage-outcome', item]);
  // }

  saveOutcome() {
    console.log('outcomeForm ', this.outcomeForm.value);

    let outcomeValue = this.outcomeForm.value;

    this.outcome.description = outcomeValue.description;
    this.outcome.responsable = outcomeValue.responsable;
    this.outcome.category = outcomeValue.category;
    this.outcome.expense = outcomeValue.expense;

    this._service.postOutcome(this.outcome).subscribe((data) => {
      this.getAllOutcomes();
      this.initForm();
    });
    this.cancel();
    this.outcomeForm.reset();
  }

  deleteOutcome(item: any) {
    this._service.deleteOutcome(item.id).subscribe((res) => {
      this.getAllOutcomes();
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
