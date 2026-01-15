import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../services/usuario';
import { UsuarioModelo } from '../../../../models/usuario.model';

@Component({
  selector: 'app-desactivar-usuario',
  templateUrl: './desactivar-usuario.html',
  styleUrls: ['./desactivar-usuario.css'],
  standalone: false,
})
export class DesactivarUsuario implements OnInit {

  usuarios: UsuarioModelo[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
      },
      error: (err) => console.error(err),
    });
  }

  cambiarEstado(usuario: UsuarioModelo): void {
    debugger;
    if (!usuario.uid) return;

    const nuevoEstado = !usuario.activo;

    this.usuarioService
      .desactivarUsuario(usuario.uid, nuevoEstado)
      .then(() => {
        usuario.activo = nuevoEstado;
      });
  }
}
