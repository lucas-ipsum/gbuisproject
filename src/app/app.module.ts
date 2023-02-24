// external Modules
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// Our Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { MkSearchComponent } from './mk-search/mk-search.component';
import { BuisAZComponent } from './buis-a-z/buis-a-z.component';
import { InfosMkComponent } from './infos-mk/infos-mk.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { InfosBuisnessComponent } from './infos-buisness/infos-buisness.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './login/registration/registration.component';
import { LoadingComponent } from './loading/loading.component'
import { MkComponent } from './mk/mk.component';
import { BuisDetailpageComponent } from './buis-detailpage/buis-detailpage.component';
import { AddbuisComponent } from './addbuis/addbuis.component';
import { FloatingButtonComponent } from './floating-button/floating-button.component';
import { ProfileComponent } from './profile/profile.component';

// Our Services
import { ApiService } from './shared/api.service';
import { BuisInfoService } from './shared/buis-info.service';
import { BuisMKService } from './shared/buis-mk.service';

// Our Pipes
import { SortBuisPipe } from './pipes/sort-buis.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { UserrightsComponent } from './profile/userrights/userrights.component';
import { FilterUserPipe } from './pipes/filter-user.pipe';
import { FilterBuisPipe } from './pipes/filter-buis.pipe';;

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    MkSearchComponent,
    BuisAZComponent,
    InfosMkComponent,
    ImpressumComponent,
    InfosBuisnessComponent,
    LoginComponent,
    RegistrationComponent,
    LoadingComponent,
    MkComponent,
    BuisDetailpageComponent,
    SortBuisPipe,
    ProfileComponent,
    FilterPipe,
    AddbuisComponent,
    FloatingButtonComponent,
    UserrightsComponent,
    FilterUserPipe,
    FilterBuisPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ApiService,
    BuisInfoService,
    BuisMKService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
