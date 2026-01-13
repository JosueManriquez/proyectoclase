import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BienvenidaAdmin } from './bienvenida-admin/bienvenida-admin';
import { BienvenidaUsuario } from './bienvenida-usuario/bienvenida-usuario';
import { CambiarRol } from './bienvenida-admin/cambiar-rol/cambiar-rol';
import { DesactivarUsuario } from './bienvenida-admin/desactivar-usuario/desactivar-usuario';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    BienvenidaAdmin,
    BienvenidaUsuario,
    CambiarRol,
    DesactivarUsuario,

  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class DashboardModule { }
