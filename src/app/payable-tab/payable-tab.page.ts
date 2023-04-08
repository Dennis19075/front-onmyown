import { Component, OnInit } from '@angular/core';
import { PayableService } from './services/payable/payable.service';
import { Outcome } from './outcomes/outcome.model';
import { Chart } from 'chart.js';
import { OutcomesPage } from './outcomes/outcomes.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'payable-tab.page.html',
  styleUrls: ['payable-tab.page.scss']
})
export class PayableTabPage implements OnInit {

  component = OutcomesPage;

  constructor() 
    {
    }

  ngOnInit() {
    this.generateOutcomes();
    this.generateIncomes();
  }

  handleRefresh(event:any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  };

  generateOutcomes() {
    let canvas: HTMLCanvasElement = document.getElementById("outcomes") as HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D | null;
    if (!(ctx = canvas.getContext("2d"))) {
        throw new Error(`2d context not supported or canvas already initialized`);
    }

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['1st week', '2nd week', '3rd week', '4th week'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1,
          borderColor: '#ff1a1a',
          backgroundColor: '#ffcccc',
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  generateIncomes() {
    let canvas: HTMLCanvasElement = document.getElementById("incomes") as HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D | null;
    if (!(ctx = canvas.getContext("2d"))) {
        throw new Error(`2d context not supported or canvas already initialized`);
    }

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['1st week', '2nd week', '3rd week', '4th week'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1,
          borderColor: '#00ff00',
          backgroundColor: '#b3ffb3',
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

}
