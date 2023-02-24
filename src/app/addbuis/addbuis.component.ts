import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { BuisInfoService } from 'src/app/shared/buis-info.service';
import { BuisMKService } from 'src/app/shared/buis-mk.service';

@Component({
  selector: 'app-addbuis',
  templateUrl: './addbuis.component.html',
  styleUrls: ['./addbuis.component.scss'],
})
export class AddbuisComponent implements OnInit {
  buisAlreadyInUse = false;
  formSuccessfullySubmitted = false;
  BuisInfoAdded = false;
  BuisMKAdded = false;
  notfocused = false;
  profileForm = this.fb.group({
    hersteller: ['', Validators.required],
    namebuis: ['', Validators.required],
    anwendung: ['', Validators.required],
    website: ['', Validators.required],
    name: [''],
    logo: [''],
    email: ['', [Validators.required, Validators.email]],
    telefon: [''],
    beschreibung: [''],
  });
  buisData: any;
  selectedMks: any;

  constructor(private buis_infoApi: BuisInfoService, private buis_mkApi: BuisMKService, private fb: FormBuilder) { }

  ngOnInit(): void { }

  getMKs(data) {
    this.selectedMks = data
  }

  get f() { return this.profileForm.controls; }

  onSubmit() {
    const formdata = this.profileForm.value
    const BuisInfo = {
      company: formdata.hersteller,
      name: formdata.namebuis,
      anwendung: formdata.anwendung,
      website: formdata.website,
      logo: formdata.logo,
      contact_name: formdata.name,
      contact_mail: formdata.email,
      contact_phone: formdata.telefon,
      info_text: formdata.beschreibung,
      kosten: formdata.kosten,          // Added to fix error
      sonstiges: formdata.sonstiges
    }
    const MKInfo = {
      name: formdata.namebuis,
      mkKriterien: this.selectedMks
    }
    this.buis_mkApi.GetBuisMK(formdata.namebuis).subscribe(res => {
      if (res.name === undefined) {
        this.buis_mkApi.AddBuisMKInfo(MKInfo).subscribe((res) => {
          console.log(res, 'mk')
        })
        this.buis_infoApi.AddBuisInfo(BuisInfo).subscribe((res) => {
          console.log(res, 'info')
        })
        this.formSuccessfullySubmitted = true
      } else {
        this.buisAlreadyInUse = true
      }
    })

  }
}
