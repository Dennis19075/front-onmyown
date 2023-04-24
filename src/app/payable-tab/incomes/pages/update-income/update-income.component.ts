import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Components } from '@ionic/core';
import { Income } from '../../income.model';
import { PayableService } from 'src/app/payable-tab/services/payable/payable.service';
import { NavParams } from '@ionic/angular';
import { RefreshPayableService } from 'src/app/payable-tab/services/refresh-payable/refresh-payable.service';


@Component({
  selector: 'app-update-income',
  templateUrl: './update-income.component.html',
  styleUrls: ['./update-income.component.scss'],
})
export class UpdateIncomeComponent implements OnInit {

  @Output() incomeUpdatedOutput = new EventEmitter<number>();

  @Input() modal: Components.IonModal;

  incomeForm: FormGroup;

  incomeIdSelected: any;

  incomeSelected: Income;

  constructor(
    public _service: PayableService,
    private fb: FormBuilder,
    public navParams: NavParams,
    private refreshPayableService: RefreshPayableService
  ) {
    // this.initForm();
  }

  ngOnInit() {
    this.getIncomeIdFromParams();
    this.initForm(this.incomeSelected);
    // console.log("this.outcomeSelected ", this.outcomeSelected);
  }

  getIncomeIdFromParams() {
    this.incomeIdSelected = this.navParams.get("id");
    // console.log("EL SELECTED: ", this.outcomeIdSelected);
    this.getIncomeById(this.incomeIdSelected);
  }

  getIncomeById(id: string) {
    this._service.getIncomeById(id).subscribe((data) => {
      // console.log("OUTCOME: ", data);
      this.incomeSelected = data;
      this.initForm(this.incomeSelected);
    });
  }

  initForm(incomeSelected: Income) {
    // debugger

    const {
      description,
      expense,
      exchange,
      category,
      createdAt,
      editedAt
    } = incomeSelected || {};
    
    this.incomeForm = this.fb.group({
      description: [description ?? null, [Validators.required]],
      expense: [expense ?? null, [Validators.required]],
      exchange: [exchange ?? null, [Validators.required]],
      category: [category ?? null, [Validators.required]],
      createdAt: [createdAt ? new Date(createdAt).toISOString() : new Date().toISOString(), []],
      editedAt: [new Date().toISOString(), []],
    });
  }

  updateIncome() {
    //PUT request
    this.incomeForm.value.id = this.incomeSelected.id;
    // console.log('FORM UPDATE: ', {id: this.outcomeSelected.id, outcome: this.outcomeForm.value});
    this._service.putIncome(this.incomeSelected.id, this.incomeForm.value).subscribe(
      (res) => {
        console.log(res);
        this.refreshPayableService.callback.emit(res);
      }
    )
    }

  saveIncome() {
    this.incomeForm.value.userId = "639a530c058b3ae812b0e1ec";
    
    if (this.incomeIdSelected) {
      this.updateIncome();
    } else {
      this.createIncome();
    }
    this.modal.dismiss('cancel');

  }

  createIncome() {
    
    this._service.postIncome(this.incomeForm.value).subscribe((res) => {
      // console.log("res: ", res);
      this.refreshPayableService.callback.emit(res);
    });
  }

  cancel() {
    //just a navigate function
    this.modal.dismiss('cancel');
    this.incomeForm.reset();
  }

}
