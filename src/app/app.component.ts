import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('paypalRef', { static: true }) private paypalRef: ElementRef;

  ngOnInit(): void {
    paypal
      .Buttons(
        {
          style: {
            layout: 'horizontal',
            color: 'blue',
            shape: 'rect',
            label: 'paypal'
          },

          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: '1000',
                    currency_code: 'USD',
                  }
                }
              ]
            });
          },

          onApprouve: (data, actions) => {
            return actions.order.capture().then((details) => {
              alert('Transaction completed');
            });
          },

          onError: error => {
            console.log(error);
          }

        }).render(this.paypalRef.nativeElement);
  }

}
