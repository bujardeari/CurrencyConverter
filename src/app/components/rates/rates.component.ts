import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.scss']
})
export class RatesComponent implements OnInit, OnDestroy {
  supportedSymbols;
  rates;
  ratesSubscription = new Subscription();
  initialBase = 'EUR';
  base: string = 'EUR';
  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.sharedService.supportedSymbols.subscribe(res => (this.supportedSymbols = res));
  }

  getExchangeRates() {
    this.ratesSubscription = this.sharedService.getAllRates(this.base).subscribe(res => {
      this.rates = res['rates'];
      this.sharedService.allRatesHistory.push(res);
    });
  }

  ngOnDestroy(): void {
    this.ratesSubscription.unsubscribe();
  }
}
