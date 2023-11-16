import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  showSearch: boolean = false;

  /*esto me ayuda con la barra de busqueda*/
  hideSearchBar(): void {
    this.showSearch = false;
  }

}
