import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateFilterByDayService {

  callback: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }
}
