import { Component, Input, OnInit, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { Router } from '@angular/router'
import { FilterBuisPipe } from '../pipes/filter-buis.pipe';
import { ApiService } from '../shared/api.service';
import { BuisInfoService } from '../shared/buis-info.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [FilterBuisPipe]
})
export class HeaderComponent implements OnInit {
  @Input() mobileHeader: boolean;
  @Output() myOutput: EventEmitter<boolean> = new EventEmitter();
  @Output() LoginStatus: EventEmitter<boolean> = new EventEmitter();
  showSidebar = true;
  showSearch = false;
  smallWindow: boolean;
  loggedIn: boolean;
  focused: boolean;
  public searchTerm: string;
  public buisData: any;
  inputValue: string;

  constructor(public mkService: BuisInfoService, private userApi: ApiService, private router: Router, private eRef: ElementRef) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.userApi.userLoggedIn.subscribe(val => {
      this.setLoggedIn(val);
    });
    const token = localStorage.getItem('token');
    if (token) {
      this.loggedIn = true
    }
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.eRef.nativeElement.contains(event.target)) {
      this.focused = true
    } else {
      this.focused = false
    }
  }

  @HostListener('window:resize', ['$event'])
  ngOnInit(): void {
    if (window.innerWidth <= 425) {
     this.smallWindow = true
    } else {
      this.smallWindow = false
    }
    this.mkService.GetBuisInfo().subscribe(val => this.buisData = val)
    const token = localStorage.getItem('token')
    if (token) {
      this.loggedIn = true
      this.LoginStatus.emit(true)
    } else {
      this.LoginStatus.emit(false)
    }
  }

  setLoggedIn(val) {
    this.LoginStatus.emit(true);
    this.loggedIn = val;
  }

  logout() {
    localStorage.clear();
    this.loggedIn = false;
    this.LoginStatus.emit(false);
    this.router.navigate(['/']);
  }

  openSidebar() {
    this.showSidebar = !this.showSidebar;
    this.myOutput.emit(this.showSidebar);
  }

  openDetailPage(buisName: string): void {
    this.focused = false
    this.router.navigate(['/buisdetailpage'], { queryParams: { name: buisName } })
    this.inputValue = ''
  }
}
