import { Injectable, runInInjectionContext, Injector } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CategoriaModelo } from '../models/categoria';



@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  constructor(private firestore: AngularFirestore, private Injector: Injector
  ) { }


  ObtenerCategorias() {
    return runInInjectionContext(this.Injector, () => {
      return this.firestore
        .collection<CategoriaModelo>('categorias')
        .valueChanges({ idField: 'id' });
    })
  }

  agregarCategorias(categoria: CategoriaModelo) {
    const id = this.firestore.createId();
    return runInInjectionContext(this.Injector, () => {
      return this.firestore
        .collection('categorias')
        .doc(id)
        .set({
          ...categoria,
          activo: true,
          creadoEn: new Date(),
        })

    })
  }

}
