import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  conversionsHistory = [];
  allRatesHistory = [];
  currentConversion;
  supportedSymbols: BehaviorSubject<any> = new BehaviorSubject<any[]>([]);
  constructor(private http: HttpClient) {}

  getRatesOnDate(date: string, base: string, symbols: string): Observable<any> {
    let params = new HttpParams();
    params = params
      .append('access_key', environment.apiKey)
      .append('base', base)
      .append('symbols', symbols);
    return this.http.get('http://data.fixer.io/api/' + date, { params: params });
  }

  getAllRates(base: string) {
    let params = new HttpParams();
    params = params.append('access_key', environment.apiKey).append('base', base);
    return this.http.get('http://data.fixer.io/api/latest', { params: params });
  }

  getSupportedSymbols() {
    let params = new HttpParams();
    params = params.append('access_key', environment.apiKey);
    this.http.get('http://data.fixer.io/api/symbols', { params: params }).subscribe(res => {
      this.supportedSymbols.next(res);
      console.log(this.supportedSymbols);
    });
  }

  saveConversionToHistory(conversion) {
    this.conversionsHistory.push(conversion);
  }
}
