import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/ngx-bootstrap-datepicker';
import { SharedService } from '../../shared.service';
import { Observable } from 'rxjs/internal/Observable';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  maxDate = new Date();
  date = new Date();
  base = { code: 'EUR', amount: 1 };
  second = { code: 'NOK', rate: 0, amount: 0 };
  supportedSymbols;

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.sharedService.supportedSymbols.subscribe(res => (this.supportedSymbols = res));
    console.log(this.supportedSymbols);

    if (!this.sharedService.currentConversion) {
      this.calculate();
    } else {
      this.date = this.sharedService.currentConversion.date;
      this.base = { ...this.sharedService.currentConversion.base };
      this.second = { ...this.sharedService.currentConversion.second };
    }
  }

  bsConfig: Partial<BsDatepickerConfig> = { adaptivePosition: true, containerClass: 'theme-blue' };

  calculate() {
    this.sharedService
      .getRatesOnDate(this.date.toISOString().slice(0, 10), this.base.code, this.second.code)
      .subscribe(res => {
        this.second.rate = res.rates[this.second.code];
        this.second.amount = this.base.amount * this.second.rate;
        this.sharedService.currentConversion = { base: this.base, second: this.second, date: this.date };
        this.sharedService.saveConversionToHistory({ base: this.base, second: this.second, date: this.date });
      });
  }
}
