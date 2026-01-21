import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../services/producto';
import { ProductoModelo } from '../../../models/producto';
import { CategoriaService } from '../../../services/categoria';
import { CategoriaModelo } from '../../../models/categoria';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Injector,runInInjectionContext } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.html',
  standalone: false,
  styleUrl: './agregar-producto.css',
})
export class AgregarProducto implements OnInit {
  categorias: CategoriaModelo[] = [];

  // Variables para manejo de imagenes
  imagenFile: File | null = null;
  imagenPreview: string | null = null;

  producto: ProductoModelo = {
    nombre: '',
    descripcion: '',
    precio: 0,
    cantidad: 0,
    categoriaId: '',
    activo: true,
    creadoEn: new Date(),
    imagenUrl: '',
  };

  constructor(
    private categoriaService: CategoriaService,
    private productoService: ProductoService,
    private cdr: ChangeDetectorRef,
    private storage: AngularFireStorage,
    private injector: Injector,
    private firestore: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.categoriaService.ObtenerCategorias().subscribe((data) => {
      this.categorias = data.filter((c) => c.activo); // solo activas
      this.cdr.detectChanges();
    });
  }

  // --- NUEVAS FUNCIONES INTEGRADAS ---

  // 1. Función para previsualizar la imagen seleccionada
  archivoSelecionado(event: any) {
    const file = event.target.files[0];

    if (!file) return;

    this.imagenFile = file;

    // Preview
    const reader = new FileReader();
    reader.onload = () => (this.imagenPreview = reader.result as string);
    reader.readAsDataURL(file);
  }

  // 2. Función guardar producto actualizada
  async guardarProducto() {
    // Validación básica
    if (!this.producto.categoriaId) {
      alert('Selecciona una categoría');
      return;
    }

    if (!this.imagenFile) {
      alert('Seleccione una imagen');
      return;
    }

    // Asignar nombre de categoría
    const categoriaSeleccionada = this.categorias.find(
      (c) => c.id === this.producto.categoriaId
    );

    if (categoriaSeleccionada) {
      this.producto.categoriaId = categoriaSeleccionada.nombre;
    }

    try {
      // Llamamos a la función local de subir imagen (o a tu servicio si prefieres moverla allá)
      await this.agregarProductoConImagen(this.producto, this.imagenFile);

      alert('Producto agregado correctamente');

      // Resetear el formulario
      this.producto = {
        nombre: '',
        descripcion: '',
        precio: 0,
        cantidad: 0, // Corregido: 'stock' no existía en tu modelo original
        categoriaId: '',
        activo: true,
        creadoEn: new Date(),
        imagenUrl: ''
      };

      // Resetear imagen
      this.imagenFile = null;
      this.imagenPreview = null;

    } catch (error) {
      console.error('Error al guardar:', error);
      alert('Hubo un error al guardar el producto');
    }
  }

  // 3. Lógica de subida a Firebase (Corregida y limpiada)
  async agregarProductoConImagen(producto: ProductoModelo, imagen: File) {
    const id = this.firestore.createId();

    // CORRECCIÓN IMPORTANTE: Uso de backticks (`) en lugar de comillas simples
    const path = `productos/${id}`;
    const ref = this.storage.ref(path);

    // Subir imagen
    await this.storage.upload(path, imagen);

    // Obtener url
    const imagenUrl = await ref.getDownloadURL().toPromise();

    // Guardar en Firestore
    // Nota: Como ya inyectaste 'firestore' en el constructor, no necesitas runInInjectionContext
    return runInInjectionContext(this.injector, () => {
      return this.firestore
        .collection('productos')
        .doc(id)
        .set({
          ...producto,
          id: id,
          imagenUrl,
          creadoEn: new Date(),
        });
    });
  }
}