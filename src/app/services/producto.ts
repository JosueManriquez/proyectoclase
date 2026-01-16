
import { Observable } from 'rxjs';

import { Injectable, Injector, runInInjectionContext } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ProductoModelo } from '../models/producto';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  constructor(
    private firestore: AngularFirestore,
    private injector: Injector
  ) {}

  agregarProducto(producto: ProductoModelo) {
    const id = this.firestore.createId();

    return runInInjectionContext(this.injector, () => {
      return this.firestore
        .collection('productos')
        .doc(id)
        .set({
          ...producto,
          creadoEn: new Date(),
          activo: true,
        });
    });
  }
}

