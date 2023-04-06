import { Component } from '@angular/core';
import { PayableService } from '../services/payable/payable.service';
import { Outcome } from './outcomes/outcome.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'payable-tab.page.html',
  styleUrls: ['payable-tab.page.scss']
})
export class PayableTabPage {

  constructor() 
    {
    }

  ngOnInit() {
  }

}
