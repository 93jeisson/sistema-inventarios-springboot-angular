import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Producto } from '../producto';
import { ProductoServicio } from '../producto.servicio';

@Component({
  selector: 'app-agregar-producto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agregar-producto.html',
})
export class AgregarProducto {

  producto: Producto = new Producto();

  private productoServicio = inject(ProductoServicio);
  private router = inject(Router);

  onSubmit(): void {
    console.log('📦 Producto enviado:', this.producto);
    this.guardarProducto();
  }

  guardarProducto(): void {
    this.productoServicio.agregarProducto(this.producto).subscribe({
      next: () => {
        console.log('✅ Producto guardado');
        this.router.navigate(['/productos']);
      },
      error: (error) => {
        console.error('❌ Error al agregar el producto:', error);
      },
    });
  }
}
