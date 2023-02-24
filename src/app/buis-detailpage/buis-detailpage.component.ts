import { Component, OnInit } from '@angular/core';
import { BuisMKService } from '../shared/buis-mk.service';
import { BuisInfoService } from '../shared/buis-info.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-buis-detailpage',
  templateUrl: './buis-detailpage.component.html',
  styleUrls: ['./buis-detailpage.component.scss']
})
export class BuisDetailpageComponent implements OnInit {
  buisName: string;
  mkKriterien: any;
  buis: any;
  MKempty: boolean;

  constructor(public buisInfoService: BuisInfoService, public mkKriterienService: BuisMKService, private location: Location) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    this.buisName = urlSearchParams.get('name');
    if (this.buisName === 'AURIGA ') {
      this.buisName = 'AURIGA+';
    }
  }

  ngOnInit(): void {
    this.buisInfoService.GetBuisByName(this.buisName).subscribe(data => this.buis = data);
    this.mkKriterienService.GetBuisMK(this.buisName).subscribe(res => {
      this.mkKriterien = res;
    });
  }

  getValue(data: boolean) {
    this.MKempty = data
  }
}



