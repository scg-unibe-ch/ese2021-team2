import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  catfilter: string = "";

  setAll() {
  this.catfilter = "";
  }

  setOffice() {
    this.catfilter = "office";
  }

  setFashion() {
    this.catfilter = "fashion";
  }

  setLifestyle() {
    this.catfilter = "lifestyle";
  }
}
