import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Producto } from '../producto';
import { ProductoServicio } from '../producto.servicio';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto-lista',
  templateUrl: './producto-lista.html',
  imports: [CommonModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductoLista implements OnInit  {
  productos: Producto[] = [];

  // Nueva forma de inyectar servicios
  private productoServicio = inject(ProductoServicio);
  private cdr = inject(ChangeDetectorRef);
  private enrutador = inject(Router);

  ngOnInit() {
    //Cargamos los productos
    this.obtenerProductos();
  }
  private obtenerProductos(): void {
    this.productoServicio.obtenerProductosLista().subscribe({
      next: (datos) => {
        console.log('productos cargados:', datos);
        this.productos = datos;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error al obtener los productos', error);
      },
    });
  }
  editarProducto(id:number){
    this.enrutador.navigate(['/editar-producto', id]);
  }
  eliminarProducto(id:number){
    this.productoServicio.eliminarProducto(id).subscribe({
      next: (datos) => this.obtenerProductos(),
      error:(errores) =>console.log(errores)
    });
  }
}
