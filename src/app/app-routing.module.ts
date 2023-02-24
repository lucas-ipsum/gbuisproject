import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

// unsere Komponenten
import { MkSearchComponent } from './mk-search/mk-search.component'
import { BuisAZComponent } from './buis-a-z/buis-a-z.component';
import { InfosMkComponent } from './infos-mk/infos-mk.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { InfosBuisnessComponent } from './infos-buisness/infos-buisness.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './login/registration/registration.component';
import { BuisDetailpageComponent } from './buis-detailpage/buis-detailpage.component';
import { ProfileComponent } from './profile/profile.component';
import { AddbuisComponent } from './addbuis/addbuis.component';

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
  onSameUrlNavigation: 'reload'
};


const routes: Routes = [
  { path: "", component: MkSearchComponent },
  { path: "buisaz", component: BuisAZComponent },
  { path: "infomk", component: InfosMkComponent },
  { path: "impressum", component: ImpressumComponent },
  { path: "infobuisness", component: InfosBuisnessComponent },
  { path: "addbuis", component: AddbuisComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegistrationComponent },
  { path: "buisdetailpage", component: BuisDetailpageComponent },
  { path: "profil", component: ProfileComponent },
  { path: "addbuis", component: AddbuisComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
