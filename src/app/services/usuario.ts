import { Injectable, inject, EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class Usuario {
  private injector: EnvironmentInjector = inject(EnvironmentInjector);

  constructor(private firestore: AngularFirestore) { }

  crearUsuario(uid: string, email: string) {
    return runInInjectionContext(this.injector, () => {
      return this.firestore.collection('usuarios').doc(uid).set({

        email,
        rol: 'usuario',
        fechaRegistro: new Date(),
      });
    });
  }
  obtenerUsuario(uid: string) {
    return runInInjectionContext(this.injector, () => {
      return this.firestore.collection('usuarios').doc(uid).valueChanges();
    });

  }
}
