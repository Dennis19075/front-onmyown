import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchInputService {

  callback: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }
}
