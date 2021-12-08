import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from "../service/data.service";
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy  {
  subscription: Subscription;
  catfilter: string = "";

  constructor(private data: DataService, private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.data.currentMessage.subscribe(message => this.catfilter = message);
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

  isShopRoute() {
    return this.router.url.match(/\/shop\S*/)
  }

  isBoardRoute() {
    return this.router.url.match(/\/board\S*/)
  }

  setTech() {
    this.data.changeMessage("technical");
  }

  setProg() {
    this.data.changeMessage("programming");
  }

  setTheo() {
    this.data.changeMessage("theoretical");
  }

  setOther() {
    this.data.changeMessage("other");
  }

  setfiltarg(filt:number){
    if(filt == 0){
      this.data.changeMessage("date");
    }
    else {
      this.data.changeMessage("likes");
    }
  }
}
