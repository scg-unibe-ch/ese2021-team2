import {Component, Input, OnInit} from '@angular/core';
import {Order} from "../../../../../models/order.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../environments/environment";

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {

    @Input() order = new Order(0, 0, "", "", "", "", [], 0)
  constructor(public httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  showAddress(): string{
        var addressArray = this.order.deliveryAddress.split(',');

        return addressArray[0]+' '+ addressArray[1]+', ' + addressArray[2] +' '+ addressArray[3];
  }
}
