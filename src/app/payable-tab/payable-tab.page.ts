import { Component, OnDestroy, OnInit } from '@angular/core';
import { PayableService } from './services/payable/payable.service';
import { Chart } from 'chart.js';
import { RefreshPayableService } from './services/refresh-payable/refresh-payable.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'payable-tab.page.html',
  styleUrls: ['payable-tab.page.scss'],
})
export class PayableTabPage implements OnInit, OnDestroy {

  progress: number = 0;
  sumIncomes: number = 0;
  sumOutcomes: number = 0;
  balance: number = 0;

  sumWeeksOutcome: string = '';
  sumWeeksIncome: string = '';

  outcomeChart: any;
  incomeChart: any;

  subscriptions: Subscription[] = [];
  getOutcomesPerWeekSubscriptions: Subscription;
  getIncomesPerWeekSubscriptions: Subscription;

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

  chartWeeksLabels = [
    '1st week',
    '2nd week',
    '3rd week',
    '4th week',
    '5th week',
  ];

  outcomesByWeek: any = [];
  incomesByWeek: any = [];

  currentMonthLabel: string;
  currentYearLabel: string;

  constructor(
    private _payableService: PayableService,
    private refreshPayableService: RefreshPayableService
  ) {}

  ngOnInit() {
    this.initRequest();
  }

  private initRequest() {
    this.getOutcomesPerWeek();
    this.getIncomesPerWeek();
    this.getUpdatedValues();
  }

  handleRefresh(event: any) {
    this.initRequest();
    event.target.complete();
  }

  /*
  * getOutcomesPerWeek
    ? for generating the graph and get current month and year labels.
  *  
  */
  private getOutcomesPerWeek() {
    this.getOutcomesPerWeekSubscriptions = this._payableService
      .GetOutcomesByWeek()
      .subscribe((data) => {
        this.getCurrentMonth(data);
        this.generateOutcomes(data);
      });
    this.subscriptions.push(this.getOutcomesPerWeekSubscriptions);
  }

  /*
  * getIncomesPerWeek
    ? just for generating the graph
  *  
  */
  private getIncomesPerWeek() {
    this.getIncomesPerWeekSubscriptions = this._payableService
      .GetIncomesByWeek()
      .subscribe((data) => {
        this.generateIncomes(data);
      });
    this.subscriptions.push(this.getIncomesPerWeekSubscriptions);
  }

  /*
  * getUpdatedValues
    ? it seems this is a service to get a value from another component not related
    + totaloutcomesSum sum all the weeks outcomes
  *  
  */
  private getUpdatedValues() {
    const observer1$: Subscription =
      this.refreshPayableService.callback.subscribe((data) => {
        //when the use filter
        console.log('ESTOY EN PAYABLE C: ', data);
        this.getOutcomesPerWeek();
        this.getIncomesPerWeek();
      });
    this.subscriptions.push(observer1$);
  }

  /*
  * sumWeeks
    ? outcomesByWeek => [week1,week2,week3.week4,week5,currentMonth,currentYear]
    + totaloutcomesSum sum all the weeks outcomes
  *  
  */
  private sumWeeks(outcomesByWeek: any) {
    let totaloutcomesSum = 0;
    for (let index = 0; index < outcomesByWeek.length - 2; index++) {
      totaloutcomesSum += outcomesByWeek[index];
    }
    return totaloutcomesSum.toFixed(2);
  }

  /*
  * generateOutcomes
    ? outcomesByWeek => [week1,week2,week3.week4,week5,currentMonth,currentYear]
    + get the month as string
    + get the year as string
  *  
  */
  private generateOutcomes(outcomesByWeek: any) {
    this.outcomesByWeek = outcomesByWeek;
    this.sumWeeksOutcome = this.sumWeeks(outcomesByWeek).toString();

    let canvas: HTMLCanvasElement = document.getElementById(
      'outcomes'
    ) as HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D | null;
    if (!(ctx = canvas.getContext('2d'))) {
      throw new Error(`2d context not supported or canvas already initialized`);
    }
    // if the graph has something on it, reload
    if (this.outcomeChart) {
      this.outcomeChart.destroy();
    }

    this.outcomeChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.chartWeeksLabels,
        datasets: [
          {
            label: 'Total: ' + this.sumWeeksOutcome + '€',
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

  /*
  * generateIncomes
    ? calcSummary to the balance and progress bar
    + sumIncomes total of incomes
    + sumOutcomes total of outcomes
    + progress una regla de 3 ;v
    + balance the difference between total incomes and outcomes
  *  
  */
  private calcSummary() {
    this.sumIncomes = Number(this.sumWeeksIncome);
    this.sumOutcomes = Number(this.sumWeeksOutcome);
    this.progress = this.sumOutcomes / this.sumIncomes;
    this.balance = this.sumIncomes - this.sumOutcomes;
  }

  /*
  * generateIncomes
    ? incomesByWeek => [week1,week2,week3.week4,week5,currentMonth,currentYear]
    + sumWeeksIncome
  *  
  */
  private generateIncomes(incomesByWeek: any) {
    this.incomesByWeek = incomesByWeek;
    this.sumWeeksIncome = this.sumWeeks(incomesByWeek).toString();
    //this method should be execute after getting incomes values not possible before
    this.calcSummary();

    let canvas: HTMLCanvasElement = document.getElementById(
      'incomes'
    ) as HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D | null;
    if (!(ctx = canvas.getContext('2d'))) {
      throw new Error(`2d context not supported or canvas already initialized`);
    }

    // if the graph has something on it, reload
    if (this.incomeChart) {
      this.incomeChart.destroy();
    }

    this.incomeChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.chartWeeksLabels,
        datasets: [
          {
            label: 'Total: ' + this.sumWeeksIncome + '€',
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

  private getCurrentMonth(outcomesByWeek: any) {
    this.currentMonthLabel = this.months[outcomesByWeek[5] - 1];
    this.currentYearLabel = outcomesByWeek[6];
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscriptions.map(x => x.unsubscribe());
  }
}
