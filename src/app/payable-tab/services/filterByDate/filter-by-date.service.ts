import { Injectable, EventEmitter } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class FilterByDateService {

  callback: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }
}
