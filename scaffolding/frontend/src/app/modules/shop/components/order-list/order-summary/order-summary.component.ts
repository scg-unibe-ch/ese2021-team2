import {Component, Input, OnInit} from '@angular/core';
import {Order} from "../../../../../models/order.model";

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {

    @Input() order = new Order(0, 0, "", "", "", "", [], 0)
  constructor() { }

  ngOnInit(): void {
  }

}
