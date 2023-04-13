import { Component, OnInit } from '@angular/core';
import { PayableService } from './services/payable/payable.service';
import { Outcome } from './outcomes/outcome.model';
import { Chart } from 'chart.js';
import { OutcomesPage } from './outcomes/outcomes.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'payable-tab.page.html',
  styleUrls: ['payable-tab.page.scss'],
})
export class PayableTabPage implements OnInit {
  component = OutcomesPage;

  outcomesByWeek: any = [];

  currentMonthLabel: string;
  currentYearLabel: string;

  constructor(private _payableService: PayableService) {}

  ngOnInit() {
    // this.generateOutcomes();
    this.generateIncomes();
    this.getOutcomesPerWeek();
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
      console.log("this.currentMonthLabel ", this.currentMonthLabel);
      console.log("this.currentYearLabel", this.currentYearLabel);
      
      this.generateOutcomes(data);
    });
  }

  generateOutcomes(outcomesByWeek: any) {
    let canvas: HTMLCanvasElement = document.getElementById(
      'outcomes'
    ) as HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D | null;
    if (!(ctx = canvas.getContext('2d'))) {
      throw new Error(`2d context not supported or canvas already initialized`);
    }

    console.log('DATA GRAH: ', outcomesByWeek);

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['1st week', '2nd week', '3rd week', '4th week', '5th week'],
        datasets: [
          {
            label: "Total: " + this.sumWeeks(outcomesByWeek).toString() + "$",
            data: [outcomesByWeek[0],outcomesByWeek[1],outcomesByWeek[2],outcomesByWeek[3],outcomesByWeek[4]],
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

  sumWeeks(outcomesByWeek: any) {
    let totalOutcomesSum = 0;
    for (let index = 0; index < outcomesByWeek.length-2; index++) {
      totalOutcomesSum+=outcomesByWeek[index];
    }
     return totalOutcomesSum;
  }

  generateIncomes() {
    let canvas: HTMLCanvasElement = document.getElementById(
      'incomes'
    ) as HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D | null;
    if (!(ctx = canvas.getContext('2d'))) {
      throw new Error(`2d context not supported or canvas already initialized`);
    }

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['1st week', '2nd week', '3rd week', '4th week','5th week'],
        datasets: [
          {
            label: "Total: 0$",
            data: [4, 8, 3, 5, 2, 3],
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

  private getCurrentMonth(weekList: any): string {

    this.currentYearLabel = weekList[6]

    let monthAsNumber: number = weekList[5];

    switch (monthAsNumber) {
      case 1:
        return 'January';
        break;
      case 2:
        return 'February';
        break;
      case 3:
        return 'March';
        break;
      case 4:
        return 'April';
        break;
      case 5:
        return 'May';
        break;
      case 6:
        return 'June';
        break;
      case 7:
        return 'July';
        break;
      case 8:
        return 'August';
        break;
      case 9:
        return 'September';
        break;
      case 10:
        return 'October';
        break;
      case 11:
        return 'November';
        break;
      case 12:
        return 'December';
        break;

      default:
        return "";
        break;
    }
  }
}
