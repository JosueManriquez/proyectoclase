import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../../services/categoria';
import { CategoriaModelo } from '../../../models/categoria';


@Component({
  selector: 'app-gestionar-categoria',
  standalone: false,
  templateUrl: './gestionar-categoria.html',
  styleUrl: './gestionar-categoria.css',
})
export class GestionarCategoria implements OnInit {
  categorias: CategoriaModelo[] = [];
  nuevaCategoria: CategoriaModelo = {
    nombre: '',
    descripcion: '',
    activo: true,
    creadoEn: new Date(),
  };

  categoriaEditando: string | null = null;
  nombreEditado: string = '';
  descripcionEditada: string = '';
  constructor(private categoriaService: CategoriaService, private cdr:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.categoriaService
      .ObtenerCategorias()
      .subscribe((categorias: CategoriaModelo[]) => {
        this.categorias = categorias;
        this.cdr.detectChanges();
      })
  }

  guardarCategoria(){
    this.categoriaService.agregarCategorias(this.nuevaCategoria).then(() =>{
      console.log('categotia agregada')
    })
  }

  editarCategoria(categoria: CategoriaModelo){

  }

  guardarEdicion(categoria: CategoriaModelo){

  }

  cancelarEdicion(){

  }


}
