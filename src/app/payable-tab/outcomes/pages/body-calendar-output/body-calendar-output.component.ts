import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonModal, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { PayableService } from 'src/app/payable-tab/services/payable/payable.service';
import { UpdateOutcomeComponent } from '../update-outcome/update-outcome.component';
import { FilterByDateService } from 'src/app/payable-tab/services/filterByDate/filter-by-date.service';

@Component({
  selector: 'app-body-calendar-output',
  templateUrl: './body-calendar-output.component.html',
  styleUrls: ['./body-calendar-output.component.scss'],
})
export class BodyCalendarOutputComponent implements OnInit {

  allOutcomes: any;
  totalOutcomes: number = 0;

  subscriptions: Subscription[] = [];

  createdAtDateFilter: string = new Date().toISOString();

  @Output() isCalendarModeOutcomeOutput = new EventEmitter<number>();

  @ViewChild(IonModal) modal: IonModal;

  outcomeForm: FormGroup;

  selectedDate: any;

  constructor(
    public _service: PayableService,
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private filterByDate: FilterByDateService,) { }

  ngOnInit() {
    this.initForm();
    this.getListFilteredByDate();
    this.getAllOutcomes(this.createdAtDateFilter.split(":").join("%3A"));
    
  }

  initForm() {

    this.outcomeForm = this.formBuilder.group({
      description: new FormControl('', [Validators.required]),
      expense: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      createdAt: new FormControl(new Date().toISOString(), []),
    });
  }

  dateChanged() {
    console.log("DATE SELCETED CALENDAR: ", this.selectedDate);
    this.isCalendarModeOutcomeOutput.emit(this.selectedDate);
  }

  getListFilteredByDate() {
    const observer1$: Subscription = this.filterByDate.callback.subscribe(
      (data) => {
        this.selectedDate = data;
        this.getAllOutcomes(data.date.split(":").join("%3A"));
      }
    );

    this.subscriptions.push(observer1$);
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

  getAllOutcomes(date: string) {
    this._service.GetOutcomesByFilters(date, "all").subscribe((data) => {

      this.allOutcomes = data;
      this.totalSum();
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


  handleRefresh(event: any) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  resetCalendar() {
    this.isCalendarModeOutcomeOutput.emit();
  }
  

}
