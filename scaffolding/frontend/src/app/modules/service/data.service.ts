import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  private pfiltSource = new BehaviorSubject('');
  currentMessage = this.pfiltSource.asObservable();

  constructor() { }

  changeMessage(message: string) {
    this.pfiltSource.next(message)
  }

}
