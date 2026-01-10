import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Registrar } from './modules/auth/registrar/registrar';
import { Login } from './modules/auth/login/login';
import { BienvenidaAdmin } from './modules/dashboard/bienvenida-admin/bienvenida-admin';
import { BienvenidaUsuario } from './modules/dashboard/bienvenida-usuario/bienvenida-usuario';
const routes: Routes = [
  { path: '', redirectTo:'login', pathMatch: 'full'},
  {path: 'registrar', component: Registrar },
  {path: 'login', component: Login},
  {path: 'admin', component: BienvenidaAdmin},
  {path: 'usuario', component: BienvenidaUsuario}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
