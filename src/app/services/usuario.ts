import { Injectable, inject, EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class Usuario {
  // obtenemos el injector manualmente
  private injector: EnvironmentInjector = inject(EnvironmentInjector);

  constructor(private firestore: AngularFirestore) {}

  crearUsuario(uid: string, email: string) {
    // ejecutamos en un contexto de inyección válido
    return runInInjectionContext(this.injector, () => {
      return this.firestore.collection('usuarios').doc(uid).set({
        uid,
        email,
        rol: 'usuario',
        fechaRegistro: new Date(),
      });
    });
  }
}
