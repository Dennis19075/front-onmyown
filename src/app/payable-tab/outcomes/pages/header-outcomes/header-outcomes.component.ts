import {
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { PayableService } from 'src/app/payable-tab/services/payable/payable.service';
import { SearchInputService } from 'src/app/payable-tab/services/searchInput/search-input.service';

@Component({
  selector: 'app-header-outcomes',
  templateUrl: './header-outcomes.component.html',
  styleUrls: ['./header-outcomes.component.scss'],
})
export class HeaderOutcomesComponent implements OnInit {

  @Output() isCalendarModeOutcomeOutput = new EventEmitter<number>();

  constructor(
    public _service: PayableService,
    private searchInputService: SearchInputService
  ) {}

  ngOnInit(): void {}
  /*
  * changeOutcomeTabs
    ? it is called when the user hit on the tab list or calendar.
    + and emit the event for the outcomes parent component.
  *  
  */
  changeOutcomeTabs($event: any) {
    console.log('$event: ', $event.detail.value);
    this.isCalendarModeOutcomeOutput.emit($event.detail.value);
  }

  /*
  * changeOutcomeTabs
    ? it is called when the user hit on the tab list or calendar.
    + and emit the event for the outcomes parent component.
  *  
  */
  handleInput(event: any) {
    if (event.target.value != '') {
      this.searchInputService.callback.emit(event.target.value);
    } else {
      this.searchInputService.callback.emit('');
    }
  }
}
