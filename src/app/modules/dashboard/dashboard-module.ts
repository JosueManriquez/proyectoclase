import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BienvenidaAdmin } from './bienvenida-admin/bienvenida-admin';
import { BienvenidaUsuario } from './bienvenida-usuario/bienvenida-usuario';



@NgModule({
  declarations: [
    BienvenidaAdmin,
    BienvenidaUsuario
  ],
  imports: [
    CommonModule
  ]
})
export class DashboardModule { }
