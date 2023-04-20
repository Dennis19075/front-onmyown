import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-outcomes-perday',
  templateUrl: './outcomes-perday.component.html',
  styleUrls: ['./outcomes-perday.component.scss'],
})
export class OutcomesPerdayComponent implements OnInit {

  selectedDay: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  this.getSelectedDay();
  }

  getSelectedDay() {
    this.selectedDay = this.route.snapshot.paramMap.get('date');
    console.log("this.selectedDay ", this.selectedDay);
    
  }

}
