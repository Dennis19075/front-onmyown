import { Component, OnInit } from '@angular/core';
import { PayableService } from 'src/app/payable-tab/services/payable/payable.service';
import { GetTotalOutcomesService } from '../services/getTotalOutcomes/get-total-outcomes.service';

@Component({
  selector: 'app-outcomes',
  templateUrl: './outcomes.page.html',
  styleUrls: ['./outcomes.page.scss'],
})
export class OutcomesPage implements OnInit {

  totalOutcomes: number = 0;

  tabSelected: string = "outcome-list";

  dateSelectedByDay: string;

  constructor(
    public _service: PayableService,
    private getTotalOutcomesService: GetTotalOutcomesService
  ) {
  }

  ngOnInit(): void {
    this.getUpdatedTotalOutcomes();
  }

  /*
  * getUpdatedTotalOutcomes
    ? getting the total sum of outcomes
  *  
  */
  getUpdatedTotalOutcomes() {
    this.getTotalOutcomesService.callback.subscribe(
      (data) => {
        this.totalOutcomes = data;
      }
    );
  }
  
  /*
  * activateCalendarMode
    ? tabSelected event to move between tabs. It is executing when an output is emiting, sent from the header-outcomes component.
  *  
  */
  activateCalendarMode($event: any) {
    this.tabSelected = $event;
  }

  /*
  * getOutcomeByDay
  *  
  */
  getOutcomeByDay($event: any) {
    this.dateSelectedByDay = $event;
    this.tabSelected = "outcome-list";
  }
}
