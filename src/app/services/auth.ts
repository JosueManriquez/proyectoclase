import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UsuarioService } from '../services/usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth,
    private userService: UsuarioService) { }

  async registrar(email: string, password: string) {
    try {
      const cred = await this.afAuth.createUserWithEmailAndPassword(email, password);
      const uid = cred.user?.uid;
      await this.userService.crearUsuario(uid!, email);
      return cred;
    } catch (error) {
      console.log("Error al registrar", error);
      throw error;
    }
  }

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }
  logout() {
    return this.afAuth.signOut();
  }

  ObtenerUsuario(uid: string) {
    return this.userService.obtenerUsuario(uid);
  };

}

