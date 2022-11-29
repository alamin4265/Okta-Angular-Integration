import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public baseUrl: string = 'api/v1/';
  public applicataionUrl: string = 'https://localhost:6295/';
  public http: HttpClient;

  constructor(private httpClient: HttpClient) {
    //this.baseUrl = baseUrl + this.baseUrl; //for prod
    this.baseUrl = this.applicataionUrl + this.baseUrl; // for dev
    this.http = httpClient;
  }
  private loading = new BehaviorSubject<boolean>(false);
  loadingState = this.loading.asObservable();

  changeLoader(message: any) {
    this.loading.next(message);
  }

  getMessages: BehaviorSubject<number> = new BehaviorSubject(0);
  getInitials: BehaviorSubject<string> = new BehaviorSubject('');

  public createInititals(userName: string): string {
    let initials = "";

    for (let i = 0; i < userName.length; i++) {
      if (userName.charAt(i) === ' ') {
        continue;
      }

      if (userName.charAt(i) === userName.charAt(i).toUpperCase()) {
        initials += userName.charAt(i);

        if (initials.length == 2) {
          break;
        }
      }
    }
    return initials;
  }

}
