import { Component, HostListener, OnInit } from '@angular/core';
import { BuisInfoService } from '../shared/buis-info.service';
import { Router } from '@angular/router';
import { SortBuisPipe } from 'src/app/pipes/sort-buis.pipe';

@Component({
  selector: 'app-mk-search',
  templateUrl: './mk-search.component.html',
  styleUrls: ['./mk-search.component.scss'],
  providers: [SortBuisPipe]
})
export class MkSearchComponent implements OnInit {
  buisData: any;
  public selectedField = '';

  constructor(public mkService: BuisInfoService, private router: Router, public sortBuisP: SortBuisPipe) { }
  ngOnInit(): void { }

  getBuis(data) {
    this.buisData = data;
  }

  openDetailPage(buisName: string): void {
    this.router.navigateByUrl('/buisdetailpage?name=' + buisName);
  }

  public sort(list: any[], ascending: boolean) {
    return this.sortBuisP.transform(list, this.selectedField, ascending);
  }
}
