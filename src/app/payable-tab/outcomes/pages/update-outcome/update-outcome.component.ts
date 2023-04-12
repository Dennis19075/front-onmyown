import { Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Components } from '@ionic/core';
import { Location } from "@angular/common";
import { ActivatedRoute, Router } from '@angular/router';
import { PayableService } from 'src/app/payable-tab/services/payable/payable.service';
import { Outcome } from '../../outcome.model';
import { IonModal, NavParams } from '@ionic/angular';
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
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public navParams: NavParams,
    private location: Location
  ) {
    // this.initForm();
  }

  ngOnInit() {
    this.getOutcomeIdFromParams();
    this.initForm(this.outcomeSelected);

    console.log("this.outcomeSelected ", this.outcomeSelected);
    
  }

  getOutcomeIdFromParams() {
    this.outcomeIdSelected = this.navParams.get("id");
    console.log("EL SELECTED: ", this.outcomeIdSelected);
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
    // debugger

    const {
      description,
      expense,
      category,
      createdAt,
      editedAt
    } = outcomeSelected || {};
    
    this.outcomeForm = this.fb.group({
      description: [description ?? null, [Validators.required]],
      expense: [expense ?? 0.0, [Validators.required]],
      category: [category ?? null, [Validators.required]],
      createdAt: [createdAt ? new Date(createdAt).toISOString() : new Date().toISOString(), []],
      editedAt: [new Date().toISOString(), []],
    });
  }

  updateOutcome() {
    //PUT request
    this.outcomeForm.value.id = this.outcomeSelected.id;
    console.log('FORM UPDATE: ', {id: this.outcomeSelected.id, outcome: this.outcomeForm.value});
    this._service.putOutcome(this.outcomeSelected.id, this.outcomeForm.value).subscribe(
      (res) => {
        console.log(res);
      }
    )
    // this.router.navigate(['tabs/payable/outcomes']);
    }

  saveOutcome() {
    this.outcomeForm.value.userId = "639a530c058b3ae812b0e1ec";
    
    
    if (this.outcomeIdSelected) {
      this.updateOutcome();
    } else {
      this.createOutcome();
    }
    this.modal.dismiss('cancel');
  }

  createOutcome() {
    this._service.postOutcome(this.outcomeForm.value).subscribe((res) => {
      console.log("res: ", res);
      
    });
  }

  cancel() {
    //just a navigate function
    this.modal.dismiss('cancel');
    this.outcomeForm.reset();
  }
}
