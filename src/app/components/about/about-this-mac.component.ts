import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-about-this-mac',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './about-this-mac.component.html',
  styleUrls: ['./about-this-mac.component.scss']
})
export class AboutThisMacComponent {
  @Input() open = false;
  @Output() closed = new EventEmitter<void>();
  version = '1.0.0';
  angular = 'Angular 19';
  author = 'Tom Steimann';
}
