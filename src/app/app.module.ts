import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { InicioComponent } from './inicio/inicio.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { InstalacionesComponent } from './instalaciones/instalaciones.component';
import { ReservarComponent } from './reservar/reservar.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { AuthenticationService } from './shared/services/authentication.service';
import { TokenInterceptor } from './shared/tokeninterceptor';
import { UserService } from './shared/services/user.service';
import { UsernameValidator } from './shared/username';
import { HeaderComponent } from './header/header.component';
import { LogoutComponent } from './logout/logout.component';
import { AdmComponent } from './reservar/adm/adm.component';
import { TabdataComponent } from './shared/components/tabdata/tabdata.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    InicioComponent,
    ServiciosComponent,
    InstalacionesComponent,
    ReservarComponent,
    RegistroComponent,
    LoginComponent,
    HeaderComponent,
    LogoutComponent,
    AdmComponent,
    TabdataComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  providers: [AuthenticationService, {
    provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
  multi: true
  },
  UserService,
  UsernameValidator],
  bootstrap: [AppComponent]
})
export class AppModule {

}

