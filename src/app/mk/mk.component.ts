import { AfterViewInit, ElementRef, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FilterPipe } from '../pipes/filter.pipe';
import { BuisInfoService } from '../shared/buis-info.service';
import { BuisMKService } from '../shared/buis-mk.service';

@Component({
  selector: 'app-mk',
  templateUrl: './mk.component.html',
  styleUrls: ['./mk.component.scss'],
  providers: [FilterPipe]
})
export class MkComponent implements OnInit, AfterViewInit {
  @Input() disabled: boolean;
  @Input() mkCriteriaBUIS: any;
  @Input() component: any
  @Output() buis: EventEmitter<Object> = new EventEmitter();
  @Output() MKempty: EventEmitter<boolean> = new EventEmitter();
  @Output() selectedMKs: EventEmitter<Array<String>> = new EventEmitter();
  filteredBuisNames = new Array();
  buisData: any;
  allMkCriteria: any;
  activeIntegration = null;
  showMK: boolean = false;
  selectedItems = new Array()

  anwendungsgebiete: string[] = ['Gesetzeskonformität', 'Zertifizierung', 'Bilanzierung', 'Lebenszyklus', 'Berichterstattung', 'Entscheidungsunterstützung', 'Unternehmensverbünde'];
  betrachtungsobjekte: string[] = ['Abfall', 'Anlagen', 'Gefahrstoff', 'Emission', 'Energie', 'Stoff/ Stoffstrom'];
  betrachtungskonzepte: string[] = ['Verwaltungszentriert', 'Bewertungszentriert', 'Managementzentriert'];
  betrachtungsgrenzen: string[] = ['Standort/ Betrieb', 'Prozess', 'Produkt', 'Zwischenbetrieblich'];
  adressatAnwender: string[] = ['Unternehmensführung', 'Umweltbeauftragte/r', 'Fachabteilung', 'Mitarbeiter*innen', 'Externe Stakeholder'];
  integrationsgrad: string[] = ['Stand-Alone', 'Add-on', 'Integriert'];

  @ViewChildren('mkKriterium') mkKriterium: QueryList<ElementRef>
  constructor(public mkService: BuisInfoService, public mkKriterienService: BuisMKService, private filter: FilterPipe) { }

  TestBuisMk = [
    {
      name: 'Quentic',
      mkKriterien: ['Zertifizierung', 'Entscheidungs­unterstützung', 'Gefahrstoff', 'Management­zentriert', 'Umwelt­beauftragte/r', 'Fachabteilung', 'Stand-Alone'],
    },
    {
      name: 'Umberto',
      mkKriterien: ['Zertifizierung', 'Bilanzierung', 'Abfall', 'Gefahrstoff', 'Bewertungs­zentriert', 'Produkt', 'Prozess', 'Externe Stakeholder', 'Unternehmens­führung', 'Add-on'],
    },
    {
      name: 'Lasat',
      mkKriterien: ['Zertifizierung', 'Abfall', 'Emission', 'Bewertungs­zentriert', 'Produkt', 'Zwischenbetrieblich', 'Fachabteilung', 'Mitarbeiter*innen', 'Stand-Alone'],
    }
  ]

  ngOnInit(): void {
    this.mkService.GetBuisInfo().subscribe(val => {
      this.buisData = val;
      this.buis.emit(this.buisData);
    });

    // Get all für Filterung
    this.mkKriterienService.GetBuisMKInfo().subscribe(val => {
      this.allMkCriteria = val
    })
  }

  ngAfterViewInit() {
    if (this.disabled) {
      if (this.mkCriteriaBUIS.mkKriterien === undefined) {
        this.MKempty.emit(true)
      } else {
        const cells = this.mkKriterium.toArray()
        cells.forEach(el => {
          el.nativeElement.classList.add('default-cursor')
          el.nativeElement.classList.remove('pointer')
          this.mkCriteriaBUIS?.mkKriterien?.forEach(elem => {
            elem === el.nativeElement.id ? el.nativeElement.classList.add('active') : null
          })
        })
      }
    }
  }

  select(event: any, id?: any): void {
    const element = event.target
    const index = this.selectedItems.indexOf(element.id);
    if (id) {
      this.setActiveIntegration(id)
    } else {
      element.classList.contains('active') ? element.classList.remove('active') : element.classList.add('active')
      if (index === -1) {
        this.selectedItems.push(element.id)
      } else {
        this.selectedItems.splice(index, 1);
      }
    }
    if (this.component === 'add') {
      this.selectedMKs.emit(this.selectedItems)
    } if (this.component === 'filter') {
      this.allMkCriteria.forEach((buis) => {
        let checker = this.selectedItems.every(v => buis.mkKriterien.includes(v))
        if (checker) {
          const index = this.filteredBuisNames.indexOf(buis.name)
          if (index === -1) {
            this.filteredBuisNames.push(buis.name)
          }
        } else {
          const index = this.filteredBuisNames.indexOf(buis.name)
          if (index > -1) {
            this.filteredBuisNames.splice(index, 1)
          }
        }
      })
      this.buis.emit(this.filter.transform(this.buisData, this.filteredBuisNames));
    }
  }



  setActiveIntegration(id: any): void {
    const index = this.selectedItems.indexOf(this.activeIntegration);
    if (this.activeIntegration === id) {
      this.activeIntegration = null
      this.selectedItems.splice(index, 1)
    } else {
      if (this.activeIntegration === null) {
        this.selectedItems.push(id)
      } else {
        this.selectedItems.splice(index, 1)
        this.selectedItems.push(id)
      }
      this.activeIntegration = id
    }
  }
}
