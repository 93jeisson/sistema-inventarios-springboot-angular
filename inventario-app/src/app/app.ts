import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { ProductoLista } from './producto-lista/producto-lista';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet, ProductoLista, RouterLink, RouterLinkActive],
  templateUrl: './app.html'
})
export class AppComponent {
  protected readonly title = signal('inventario-app');
}
