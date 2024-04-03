import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'knn-admin-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isOpen = true;

  @Output()
  toggleMenuEvent = new EventEmitter<boolean>();

  toggledMenu(){
    this.isOpen = !this.isOpen;

    return this.toggleMenuEvent.emit(this.isOpen);
  }
}
