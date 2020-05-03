import { Component } from '@angular/core';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CurrencyConverter';
  isCollapsed = true;
  constructor(private sharedService: SharedService) {
    this.sharedService.getSupportedSymbols();
  }
}
