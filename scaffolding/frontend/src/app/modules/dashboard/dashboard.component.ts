import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from "../service/data.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy  {
  subscription: Subscription;
  catfilter: string = "";

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.subscription = this.data.currentMessage.subscribe(message => this.catfilter = message)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  

  setAll() {
    this.data.changeMessage("")
  }

  setOffice() {
    this.data.changeMessage("office");
  }

  setFashion() {
    this.data.changeMessage("fashion");
  }

  setLifestyle() {
    this.data.changeMessage("lifestyle");
  }
}
