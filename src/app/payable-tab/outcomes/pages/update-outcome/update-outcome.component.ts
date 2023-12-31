import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Components } from '@ionic/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PayableService } from 'src/app/payable-tab/services/payable/payable.service';
import { Outcome } from '../../outcome.model';
import { NavParams, ToastController } from '@ionic/angular';
import { RefreshPayableService } from 'src/app/payable-tab/services/refresh-payable/refresh-payable.service';
import { DateFilterByDayService } from 'src/app/payable-tab/services/dateFilterByDay/date-filter-by-day.service';
@Component({
  selector: 'app-update-outcome',
  templateUrl: './update-outcome.component.html',
  styleUrls: ['./update-outcome.component.scss'],
})
export class UpdateOutcomeComponent implements OnInit {
  @Output() outcomeUpdatedOutput = new EventEmitter<number>();

  @Input() modal: Components.IonModal;

  outcomeForm: FormGroup;

  outcomeIdSelected: any;

  outcomeSelected: Outcome;

  constructor(
    public _service: PayableService,
    private fb: FormBuilder,
    public navParams: NavParams,
    private refreshPayableService: RefreshPayableService,
    private toastController: ToastController,
    private dateFilterByDayService: DateFilterByDayService
  ) {
    // this.initForm();
  }

  ngOnInit() {
    this.getOutcomeIdFromParams();
    this.initForm(this.outcomeSelected);
    // console.log("this.outcomeSelected ", this.outcomeSelected);
  }

  getOutcomeIdFromParams() {
    this.outcomeIdSelected = this.navParams.get('id');
    // console.log("EL SELECTED: ", this.outcomeIdSelected);
    this.getOutcomeById(this.outcomeIdSelected);
  }

  getOutcomeById(id: string) {
    this._service.getOutcomeById(id).subscribe((data) => {
      // console.log("OUTCOME: ", data);
      this.outcomeSelected = data;
      this.initForm(this.outcomeSelected);
    });
  }

  initForm(outcomeSelected: Outcome) {
    const { description, expense, exchange, category, createdAt, editedAt, enable } =
      outcomeSelected || {};

    this.outcomeForm = this.fb.group({
      description: [description ?? null, [Validators.required]],
      expense: [expense ?? null, [Validators.required]],
      exchange: [exchange ?? null, [Validators.required]],
      category: [category ?? null, [Validators.required]],
      createdAt: [
        createdAt
          ? new Date(createdAt).toISOString()
          : new Date().toISOString(),
        [],
      ],
      editedAt: [new Date().toISOString(), []],
      enable: [enable ?? true, [Validators.required]],
    });
  }

  updateOutcome() {
    //PUT request
    this.outcomeForm.value.id = this.outcomeSelected.id;
    // console.log('FORM UPDATE: ', {id: this.outcomeSelected.id, outcome: this.outcomeForm.value});
    this._service
      .putOutcome(this.outcomeSelected.id, this.outcomeForm.value)
      .subscribe((res) => {
        console.log(res);
        this.refreshPayableService.callback.emit(res);
      });
  }

  async saveOutcome() {
    this.outcomeForm.value.userId = '639a530c058b3ae812b0e1ec';
    if (this.outcomeIdSelected) {
      this.updateOutcome();
      const toast = await this.toastController.create({
        message: 'Outcome updated!',
        duration: 2500,
        color: 'success',
        position: 'bottom',
      });

      await toast.present();
    } else {
      this.createOutcome();
      const toast = await this.toastController.create({
        message: 'Outcome created!',
        duration: 2500,
        color: 'success',
        position: 'bottom',
      });
      await toast.present();
    }
    this.modal.dismiss('cancel');
    //in both cases update the graph
  }

  createOutcome() {
    this._service.postOutcome(this.outcomeForm.value).subscribe((res) => {
      // console.log("res: ", res);
      this.refreshPayableService.callback.emit(res);
    });
  }

  cancel() {
    //just a navigate function
    // this.dateFilterByDayService.callback.subscribe((data) => {
    //   console.log('WHEN CANCEL GET ME THE SELECTED DAY ', data);
    // });
    this.modal.dismiss('cancel');
    this.outcomeForm.reset();
  }
}
