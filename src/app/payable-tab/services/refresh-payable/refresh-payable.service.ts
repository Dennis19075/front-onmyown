import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RefreshPayableService {

  callback: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }
}
