import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { InicioComponent } from './inicio/inicio.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { InstalacionesComponent } from './instalaciones/instalaciones.component';
import { ReservarComponent } from './reservar/reservar.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  {path: 'inicio', component: InicioComponent},
  {path: 'servicios', component: ServiciosComponent},
  {path: 'instalaciones', component: InstalacionesComponent},
  {path: 'reservar', component: ReservarComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: '', redirectTo: 'inicio', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
