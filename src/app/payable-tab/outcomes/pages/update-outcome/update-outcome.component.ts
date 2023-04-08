import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PayableService } from 'src/app/payable-tab/services/payable/payable.service';

@Component({
  selector: 'app-update-outcome',
  templateUrl: './update-outcome.component.html',
  styleUrls: ['./update-outcome.component.scss'],
})
export class UpdateOutcomeComponent implements OnInit {

  outcomeForm: FormGroup;

  constructor(
    public _service: PayableService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.initForm();
  }

  ngOnInit() {}

  initForm() {
    this.outcomeForm = this.formBuilder.group({
      // createdAt: ['', Validators.required],
      description: ['', Validators.required],
      responsable: ['', Validators.required],
      expense: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  updateOutcome() {
    //PUT request
  }

  // deleteOutcome(item: any) {
  //   this._service.deleteOutcome(item.id).subscribe((res) => {
  //     this.getAllOutcomes();
  //   });
  // }

  cancel() {
    //just a navigate function
  }


}
