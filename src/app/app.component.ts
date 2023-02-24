import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  sidebarHidden: boolean = false
  mobileHeader: boolean = false
  loginStatus: boolean;
  @HostListener('window:resize', ['$event'])

  ngOnInit(): void {
    if (window.innerWidth <= 1023) {
      this.mobileHeader = true
      this.sidebarHidden = true
    } else {
      this.mobileHeader = false
      this.sidebarHidden = false
    }
  }

  constructor() { }

  GetChildData(data: any) {
    this.sidebarHidden = data
  }
  getStatus(data: any) {
    this.loginStatus = data
  }
}
