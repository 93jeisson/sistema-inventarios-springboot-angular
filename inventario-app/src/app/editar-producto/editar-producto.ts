import { Component, inject } from '@angular/core';
import { Producto } from '../producto';
import { ProductoServicio } from '../producto.servicio';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-producto',
  imports: [FormsModule],
  templateUrl: './editar-producto.html',
})
export class EditarProducto {
  producto: Producto = new Producto();
  id: number;

  private productoServicio = inject(ProductoServicio);
  private ruta = inject(ActivatedRoute);
  private enrutador = inject(Router);

  ngOnInit() {
    this.id = this.ruta.snapshot.params['id'];
    this.productoServicio.obtenerProductoPorId(this.id).subscribe({
      next: (dato) => (this.producto = dato),
      error: (errores: any) => console.log(errores),
    });
  }
  onSubmit() {
    this.guardarProducto();
  }
  guardarProducto() {
    this.productoServicio.editarProducto(this.id, this.producto).subscribe({
      next: (dato) => this.irProductoLista(),
      error: (errores: any) => console.log(errores),
    });
  }
  irProductoLista() {
    this.enrutador.navigate(['/productos']);
  }
  regresar() {
    this.enrutador.navigate(['/productos']);
  }
}
