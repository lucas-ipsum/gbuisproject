import { ViewportScroller } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BuisInfoService } from '../shared/buis-info.service';

@Component({
  selector: 'app-buis-a-z',
  templateUrl: './buis-a-z.component.html',
  styleUrls: ['./buis-a-z.component.scss']
})

export class BuisAZComponent implements OnInit {
  buisData: any;
  alphabet: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  alphabetal: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
  alphabetmz: string[] = ['M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  @Input() mobileHeader: boolean;

  constructor(public mkService: BuisInfoService, private router: Router, private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
    this.mkService.GetBuisInfo().subscribe(val => {
      this.buisData = val;
    });
  }

  openDetailPage(buisName: string): void {
    this.router.navigateByUrl('/buisdetailpage?name=' + buisName);
  }

  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }

}



