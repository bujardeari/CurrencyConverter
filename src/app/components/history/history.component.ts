import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  conversions;
  ratesHistory;
  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.conversions = this.sharedService.conversionsHistory;
    this.ratesHistory = this.sharedService.allRatesHistory;
  }
}
