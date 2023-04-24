import { Component, OnInit } from '@angular/core';
import { PayableService } from './services/payable/payable.service';
import { Outcome } from './outcomes/outcome.model';
import { Chart } from 'chart.js';
import { OutcomesPage } from './outcomes/outcomes.page';
import { RefreshPayableService } from './services/refresh-payable/refresh-payable.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'payable-tab.page.html',
  styleUrls: ['payable-tab.page.scss'],
})
export class PayableTabPage implements OnInit {
Number(arg0: string) {
throw new Error('Method not implemented.');
}

  progress:  number = 0;
  sumIncomes: number = 0;
  sumOutcomes: number = 0;
  balance: number = 0;

  outcomeChart: any;
  incomeChart: any;

  subscriptions: Subscription[] = [];

  customPopoverOptions = {
    header: '',
    subHeader: 'Select month',
    message: '',
  };

  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  component = OutcomesPage;

  outcomesByWeek: any = [];
  incomesByWeek: any = [];

  currentMonthLabel: string;
  currentYearLabel: string;

  constructor(
    private _payableService: PayableService,
    private refreshPayableService: RefreshPayableService
    ) {}

  ngOnInit() {
    // this.generateOutcomes();
    this.getOutcomesPerWeek();
    this.getIncomesPerWeek();
    this.getUpdatedValues();
  }

  calcSummary() {
    let outcomes = Number(this.sumWeeks(this.outcomesByWeek).toString());
    let incomes = Number(this.sumWeeks(this.incomesByWeek).toString());

    this.sumIncomes= incomes;
    this.sumOutcomes = outcomes;
    // this 1000 should be the total incomes
    this.progress = outcomes / incomes;
    this.balance = incomes - outcomes;
    
    console.log("Getting the total outcomes: ", this.outcomesByWeek);
    console.log("Getting the total incomes: ", this.incomesByWeek);
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  }

  getOutcomesPerWeek() {
    
    this._payableService.GetOutcomesByWeek().subscribe((data) => {
      this.currentMonthLabel = this.getCurrentMonth(data);
      console.log('this.currentMonthLabel ', this.currentMonthLabel);
      console.log('this.currentYearLabel', this.currentYearLabel);

      this.generateOutcomes(data);
    });
  }

  getIncomesPerWeek() {
    
    this._payableService.GetIncomesByWeek().subscribe((data) => {
      this.currentMonthLabel = this.getCurrentMonth(data);
      console.log('this.currentMonthLabel ', this.currentMonthLabel);
      console.log('this.currentYearLabel', this.currentYearLabel);
      console.log("INCOMES BY WEEK: ", data);
      
      this.generateIncomes(data);
    });
  }

  getUpdatedValues() {
    const observer1$: Subscription = this.refreshPayableService.callback.subscribe(
      (data) => {
        //when the use filter
        console.log("ESTO EN PAYABLE C: ", data);
        this.getOutcomesPerWeek();
      }
    );

    this.subscriptions.push(observer1$);
  }

  generateOutcomes(outcomesByWeek: any) {

    this.outcomesByWeek = outcomesByWeek;

    let canvas: HTMLCanvasElement = document.getElementById(
      'outcomes'
    ) as HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D | null;
    if (!(ctx = canvas.getContext('2d'))) {
      throw new Error(`2d context not supported or canvas already initialized`);
    }

    console.log('DATA GRAH: ', outcomesByWeek);

    // if the graph has something on it, reload
    if (this.outcomeChart) {
      this.outcomeChart.destroy();
    }

    this.outcomeChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['1st week', '2nd week', '3rd week', '4th week', '5th week'],
        datasets: [
          {
            label: 'Total: ' + this.sumWeeks(outcomesByWeek).toString() + '€',
            data: [
              outcomesByWeek[0],
              outcomesByWeek[1],
              outcomesByWeek[2],
              outcomesByWeek[3],
              outcomesByWeek[4],
            ],
            borderWidth: 1,
            borderColor: '#ff1a1a',
            backgroundColor: '#ffcccc',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  sumWeeks(xcomesByWeek: any) {
    let totalxcomesSum = 0;
    for (let index = 0; index < xcomesByWeek.length - 2; index++) {
      totalxcomesSum += xcomesByWeek[index];
    }
    return totalxcomesSum.toFixed(2);
  }

  generateIncomes(incomesByWeek: any) {

    this.incomesByWeek = incomesByWeek;
    this.calcSummary();

    let canvas: HTMLCanvasElement = document.getElementById(
      'incomes'
    ) as HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D | null;
    if (!(ctx = canvas.getContext('2d'))) {
      throw new Error(`2d context not supported or canvas already initialized`);
    }

    console.log('DATA GRAH: ', incomesByWeek);

    // if the graph has something on it, reload
    if (this.incomeChart) {
      this.incomeChart.destroy();
    }

    this.outcomeChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['1st week', '2nd week', '3rd week', '4th week', '5th week'],
        datasets: [
          {
            label: 'Total: ' + this.sumWeeks(incomesByWeek).toString() + '€',
            data: [
              incomesByWeek[0],
              incomesByWeek[1],
              incomesByWeek[2],
              incomesByWeek[3],
              incomesByWeek[4],
            ],
            borderWidth: 1,
            borderColor: '#00ff00',
            backgroundColor: '#b3ffb3',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
  // generateIncomes(outcomesByWeek: any) {

  //   this.calcSummary(outcomesByWeek);

  //   let canvas: HTMLCanvasElement = document.getElementById(
  //     'incomes'
  //   ) as HTMLCanvasElement;
  //   let ctx: CanvasRenderingContext2D | null;
  //   if (!(ctx = canvas.getContext('2d'))) {
  //     throw new Error(`2d context not supported or canvas already initialized`);
  //   }

  //   new Chart(ctx, {
  //     type: 'line',
  //     data: {
  //       labels: ['1st week', '2nd week', '3rd week', '4th week', '5th week'],
  //       datasets: [
  //         {
  //           label: 'Total: 0€',
  //           data: [4, 8, 3, 5, 2, 3],
  //           borderWidth: 1,
  //           borderColor: '#00ff00',
  //           backgroundColor: '#b3ffb3',
  //         },
  //       ],
  //     },
  //     options: {
  //       scales: {
  //         y: {
  //           beginAtZero: true,
  //         },
  //       },
  //     },
  //   });
  // }

  private getCurrentMonth(weekList: any): string {
    this.currentYearLabel = weekList[6];

    let monthAsNumber: number = weekList[5];

    switch (monthAsNumber) {
      case 1:
        return this.months[0];
        break;
      case 2:
        return this.months[1];
        break;
      case 3:
        return this.months[2];
        break;
      case 4:
        return this.months[3];
        break;
      case 5:
        return this.months[4];
        break;
      case 6:
        return this.months[5];
        break;
      case 7:
        return this.months[6];
        break;
      case 8:
        return this.months[7];
        break;
      case 9:
        return this.months[8];
        break;
      case 10:
        return this.months[9];
        break;
      case 11:
        return this.months[10];
        break;
      case 12:
        return this.months[11];
        break;

      default:
        return '';
        break;
    }
  }
}
