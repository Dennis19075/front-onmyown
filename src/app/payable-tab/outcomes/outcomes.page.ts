import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { PayableService } from 'src/app/services/payable/payable.service';
import { Outcome } from './outcome.model';

@Component({
  selector: 'app-outcomes',
  templateUrl: './outcomes.page.html',
  styleUrls: ['./outcomes.page.scss'],
})
export class OutcomesPage implements OnInit {
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

  message =
    'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string = '';

  constructor(
    public _service: PayableService,
    private router: Router,
    private formBuilder: FormBuilder
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
    this.getAllOutcomes();
  }
  // ngOnChanges() {}

  // ionViewWillEnter() {
  //   this.getAllOutcomes();
  // }

  getAllOutcomes() {
    this._service.getOutcomes().subscribe((data) => {
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
}
